module Mutations
  class PlaceHold < BaseMutation
    field :hold, Types::HoldType, null: true

    argument :record_id, ID, required: true

    def resolve(record_id:)
      member = context[:signed_in_member]
      if !member
        {}
      else
        hold = member.holds.create(
          record: Record.find(record_id),
          begins_on: Time.current,
          expires_on: 30.days.from_now,
        )

        HoldMailer.with(hold: hold).mailing_rules.deliver_later

        { hold: hold }
      end
    end
  end
end
