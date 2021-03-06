require "http"
require "nokogiri"

module Graph
  class Query < Graph::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field(
      def add_bank_card(nonce:, name: nil)
        BankCard.create(nonce: nonce, name: name || "Bank card added on #{Time.current.to_date}")
      end,
      Graph::BankCardType,
      null: false,
     ) do
      description "Add a bank card by nonce"
      argument :nonce, String, required: true
      argument :name, String, required: false
    end

    field(
      def add_record(name: "", byline: "", summary: nil, image_address: nil)
        if context[:signed_in_member].nil?
          raise GraphQL::ExecutionError, "Sign in please."
        end
  
        record = Record.new(
          name: name,
          byline: byline,
          summary: summary,
          image_address: image_address,
          member: context[:signed_in_member],
        )
  
        if(record.save)
          record
        end
      end,
      Graph::RecordType,
      null: false,
     ) do
      argument :name, String, required: false
      argument :byline, String, required: false
      argument :summary, String, required: false
      argument :image_address, String, required: false
    end

    field(
      def change_me(name: nil, surname: nil, address: nil, cash_handle: nil)
        member = context[:signed_in_member]
        if !member
          nil
        else
          keys = {}
          keys[:name] = name unless name.nil?
          keys[:surname] = surname unless surname.nil?
          keys[:address] = address unless address.nil?
          keys[:cash_handle] = cash_handle unless cash_handle.nil?
          member.update!(keys)
          member
        end
      end,
      Graph::MemberType,
      null: true,
    ) do
      argument :name, String, required: false
      argument :surname, String, required: false
      argument :address, String, required: false
      argument :cash_handle, String, required: false
    end

    field(
      def change_record(id:, name: nil, byline: nil, summary: nil)
        if context[:signed_in_member].nil?
          raise GraphQL::ExecutionError, "Sign in please."
        end
  
        keys = {}
        keys[:name] = name if name
        keys[:byline] = byline if byline
        keys[:summary] = summary if summary
        record = Record.find(id)
  
        if(record && record.member == context[:signed_in_member])
          record.update(keys)
        end
  
        record
      end,
      Graph::RecordType,
      null: false,
     ) do
      argument :id, ID, required: true
      argument :name, String, required: false
      argument :byline, String, required: false
      argument :summary, String, required: false
    end

    field(
      def charge_bank_card(nonce:, price: 0, pool:)
        PoolCharge.create({
          pool: pool,
          bank_card_nonce: nonce,
          price: price,
          paid_on: Time.current
        })
      end,
      Graph::PoolChargeType,
      null: true,
     ) do
      argument :pool, String, required: true
      argument :nonce, String, required: true
      argument :price, Float, required: true
    end

    field(
      def drop_record(id:)
        signed_in_member = context[:signed_in_member]
  
        if(signed_in_member.nil?)
          raise GraphQL::ExecutionError, "Sign in please."
        end
  
        record = Record.find(id)
        if(record.member == signed_in_member)
          record.destroy
          id
        end
      end,
      ID,
      null: false,
    ) do
      argument :id, ID, required: true
    end

    field(
      [Graph::GoodreadsResponseType],
      null: false,
    ) do
      description "Goodreads books based on a search."
      argument :search, String, required: true
    end

    field(
      def me
        context[:signed_in_member]
      end,
      Graph::MemberType,
      null: true,
      description: "Signed-in member."
    )

    field(
      def records(only:, search:)
        if(search)
          Record.search(search).limit(only).includes(:member)
        else
          Record.all.limit(only).includes(:member)
        end
      end,
      [Graph::RecordType],
      null: false
    ) do
      description "Library records."
      argument :only, Integer, required: false, default_value: 21, prepare: ->(only, ctx) { [only, 30].min }
      argument :search, String, required: false, default_value: nil
    end

    field(
      def reimbursals
        Reimbursal.all
      end,
      [Graph::ReimbursalType],
      null: false
    ) do
      description "Reimbursed charges"
    end

    field(
      def place_hold(record_id:)
        member = context[:signed_in_member]
        if !member
          {}
        else
          hold = member.holds.create(
            record: Record.find(record_id),
            begins_on: Time.current,
            expires_on: 30.days.from_now,
            landing_code: SecureRandom.uuid,
          )
  
          HoldMailer.with(hold: hold).mailing_rules.deliver_later
          HoldMailer.with(hold: hold).landing_rules.deliver_later
  
          hold
        end
      end,
      Graph::HoldType,
      null: false,
    ) do
      argument :record_id, ID, required: true
    end

    field(
      def pool_charges(pool:)
        PoolCharge.where(pool: pool)
      end,
     [Graph::PoolChargeType],
     null: false,
    ) do
      description "All charges for a pool"
      argument :pool, String, required: true
    end

    field(
      def sign_in(email:)
        member = Member.find_by(email: email)
        member ||= Member.create(email: email)
        return {} unless member

        session = Session.create(
          member: member,
          expires: 30.days.from_now,
          code: SecureRandom.uuid,
        )
        SessionMailer.with(session: session).claim.deliver_later

        member
      end,
      Graph::MemberType,
      null: false,
    ) do
      argument :email, String, required: true
    end
  end
end
