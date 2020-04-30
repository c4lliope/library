class Record < ApplicationRecord
  belongs_to :member
  has_many :bookings
end
