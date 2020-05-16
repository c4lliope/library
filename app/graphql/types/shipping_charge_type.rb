module Types
  class ShippingChargeType < Types::BaseObject
    field :price, Float, null: false
    field :hold_id, ID, null: false
  end
end
