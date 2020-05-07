module Mutations
  class ChangeMe < BaseMutation
    argument :name, String, required: true
    argument :surname, String, required: true
    argument :address, String, required: true

    field :me, Types::MemberType, null: false

    def resolve(name:, surname:, address:)
      member = context[:signed_in_member]
      if !member
        {}
      else
        member.update!(name: name, surname: surname, address: address)
        { me: member }
      end
    end
  end
end
