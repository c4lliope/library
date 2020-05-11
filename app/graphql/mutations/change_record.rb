module Mutations
  class ChangeRecord < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: false
    argument :byline, String, required: false
    argument :summary, String, required: false

    field :record, Types::RecordType, null: true
    field :errors, [String], null: false

    def resolve(id:, name: nil, byline: nil, summary: nil)
      if context[:signed_in_member].nil?
        raise GraphQL::ExecutionError, "Sign in please."
      end

      keys = {}
      keys[:name] = name if name
      keys[:byline] = byline if byline
      keys[:summary] = summary if summary

      record = Record.find(id)
      if(record) # .member == context[:signed_in_member]
        record.update(keys)
        { record: record }
      else
        { errors: record.errors.full_messages }
      end
    end
  end
end
