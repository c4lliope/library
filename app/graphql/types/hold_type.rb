module Types
    class HoldType < Types::BaseObject
      field :id, ID, null: false
      field :record, RecordType, null: false
      field :member, MemberType, null: true
      field :begins_on, GraphQL::Types::ISO8601Date, null: false
      field :expires_on, GraphQL::Types::ISO8601Date, null: false
    end
end
