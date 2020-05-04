module Mutations
  class AddRecord < BaseMutation
    argument :name, String, required: true
    argument :byline, String, required: true
    argument :summary, String, required: false

    field :record, Types::RecordType, null: true
    field :errors, [String], null: false

    def resolve(name:, byline:, summary: nil)
      if context[:signed_in_member].nil?
        raise GraphQL::ExecutionError, "Sign in please."
      end

      record = Record.new(
        name: name,
        byline: byline,
        summary: summary,
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
