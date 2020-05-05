module Mutations
  class ChangeRecord < BaseMutation
    argument :id, ID, required: true
    argument :name, String, required: true
    argument :byline, String, required: true
    argument :summary, String, required: false
    argument :image, String, required: false

    field :record, Types::RecordType, null: true
    field :errors, [String], null: false

    def resolve(id:, name:, byline:, summary: "", image:)
      if context[:signed_in_member].nil?
        raise GraphQL::ExecutionError, "Sign in please."
      end

      record = Record.find(id)
      if(record.member == context[:signed_in_member])

        puts "Image: #{image.length}"
        
        record.update(
          name: name,
          byline: byline,
          summary: summary,
          image: image,
        )

        { record: record }
      else
        { errors: record.errors.full_messages }
      end
    end
  end
end
