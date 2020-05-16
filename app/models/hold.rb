class Hold < ApplicationRecord
  belongs_to :member
  belongs_to :record
  has_many :shipping_charges
end
