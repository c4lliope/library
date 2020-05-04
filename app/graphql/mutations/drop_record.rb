module Mutations
  class DropRecord < BaseMutation
    # TODO: define return fields
    # field :post, Types::PostType, null: false

    argument :id, ID, required: true

    field :id, ID, null: true
    field :errors, [String], null: false

    def resolve(id:)
      signed_in_member = context[:signed_in_member]

      if(signed_in_member.nil?)
        raise GraphQL::ExecutionError, "Sign in please."
      end

      record = Record.find(id)
      if(record.member == signed_in_member)
        record.destroy
        { id: id }
      else
        { errors: "you can only drop books you are holding." }
      end
    end
  end
end
