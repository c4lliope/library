class ShippingCharge < ApplicationRecord
    belongs_to :member
    belongs_to :hold
end
