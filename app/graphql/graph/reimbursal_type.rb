module Graph
  class ReimbursalType < Graph::BaseObject
    field :price, Float, null: false
    field :paid_on, GraphQL::Types::ISO8601Date, null: false
    field :medium, String, null: false
  end
end
