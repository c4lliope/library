module Graph
  class PoolChargeType < Graph::BaseObject
    field :pool, String, null: false
    field :price, Float, null: false
    field :donor_handle, String, null: false
    field :paid_on, GraphQL::Types::ISO8601Date, null: false
  end
end
