class Member < ApplicationRecord
    has_many :records
    has_many :bookings
    has_many :booked_records, through: :bookings
end
