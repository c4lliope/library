module Mutations
  class ChangeMe < BaseMutation
    argument :name, String, required: false
    argument :surname, String, required: false
    argument :address, String, required: false
    argument :cash_handle, String, required: false

    field :me, Types::MemberType, null: false

    def resolve(name: nil, surname: nil, address: nil, cash_handle: nil)
      member = context[:signed_in_member]
      if !member
        {}
      else
        keys = {}
        keys[:name] = name unless name.nil?
        keys[:surname] = surname unless surname.nil?
        keys[:address] = address unless address.nil?
        keys[:cash_handle] = cash_handle unless cash_handle.nil?
        member.update!(keys)
        { me: member }
      end
    end
  end
end
