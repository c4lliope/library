module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :records,
      [Types::RecordType],
      null: false,
      description: "Library records."

    field :me,
      Types::MemberType,
      null: true,
      description: "Signed-in member."

    def records
      Record.all
    end

    def me
      context[:signed_in_member]
    end
  end
end
