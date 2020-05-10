module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :records, [Types::RecordType], null: false do
      description "Library records."
      argument :only, Integer, required: false, default_value: 21, prepare: ->(only, ctx) { [only, 30].min }
      argument :search, String, required: false, default_value: nil
    end

    field :me,
      Types::MemberType,
      null: true,
      description: "Signed-in member."

    def records(only:, search:)
      if(search)
        Record.search(search).limit(only)
      else
        Record.all.limit(only)
      end
    end

    def me
      context[:signed_in_member]
    end
  end
end
