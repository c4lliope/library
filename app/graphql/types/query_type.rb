module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :records,
      [Types::RecordType],
      null: false,
      description: "Library records."

    def records
      Record.all
    end
  end
end
