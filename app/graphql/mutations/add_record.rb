module Mutations
  class AddRecord < BaseMutation
    field :record, Types::RecordType, null: true
    field :errors, [String], null: false

    def resolve()
      if context[:signed_in_member].nil?
        raise GraphQL::ExecutionError, "Sign in please."
      end

      record = Record.new(
        name: "",
        byline: "",
        summary: "",
        member: context[:signed_in_member],
      )

      if(record.save)
        { record: record }
      else
        { errors: record.errors.full_messages }
      end
    end
  end
end
