module Mutations
  class SignIn < BaseMutation
    argument :email, String, required: true

    field :code, String, null: true
    field :member, Types::MemberType, null: true

    def resolve(email:)
      member = Member.find_by!(email: email)
      return {} unless member

      session = Session.create(
        member: member,
        expires: 30.days.from_now,
        code: SecureRandom.uuid,
      )
      SessionMailer.with(session: session).claim.deliver_later

      {
        code: session.code,
        member: member,
      }
    end
  end
end
