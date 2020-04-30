class Booking < ApplicationRecord
  belongs_to :member
  belongs_to :booked_record, class_name: "Record", foreign_key: "record_id"
end
