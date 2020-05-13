module Types
    class HoldType < Types::BaseObject
      field :id, ID, null: false
      field :record, ID, null: false
      field :member, MemberType, null: false
      field :begins_on, GraphQL::Types::ISO8601Date, null: false
      field :expires_on, GraphQL::Types::ISO8601Date, null: false

      def record
        object.record.id
      end
    end
end
