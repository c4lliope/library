module Mutations
  class ChangeMe < BaseMutation
    argument :name, String, required: false
    argument :surname, String, required: false
    argument :address, String, required: false

    field :me, Types::MemberType, null: false

    def resolve(name: nil, surname: nil, address: nil)
      member = context[:signed_in_member]
      if !member
        {}
      else
        keys = {}
        keys[:name] = name unless name.nil?
        keys[:surname] = surname unless surname.nil?
        keys[:address] = address unless address.nil?
        member.update!(name: name, surname: surname, address: address)
        { me: member }
      end
    end
  end
end
