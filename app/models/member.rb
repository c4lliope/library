class Member < ApplicationRecord
    has_many :records
    has_many :holds
    has_many :sessions, dependent: :destroy
    has_many :shipping_charges
end
