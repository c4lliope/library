module Graph
  class ShippingChargeType < Graph::BaseObject
    field :price, Float, null: false
    field :hold_id, ID, null: false
  end
end
