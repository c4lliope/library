class Member < ApplicationRecord
    has_many :records
    has_many :holds
    has_many :held_records, through: :holds
    has_many :sessions, dependent: :destroy
end
