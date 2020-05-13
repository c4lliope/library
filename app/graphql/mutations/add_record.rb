module Mutations
  class AddRecord < BaseMutation
    argument :name, String, required: false
    argument :byline, String, required: false
    argument :summary, String, required: false
    argument :image_address, String, required: false

    field :record, Types::RecordType, null: true
    field :errors, [String], null: false

    def resolve(name: "", byline: "", summary: nil, image_address: nil)
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
        { record: record }
      else
        { errors: record.errors.full_messages }
      end
    end
  end
end
