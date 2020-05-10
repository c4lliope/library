class Hold < ApplicationRecord
  belongs_to :member
  belongs_to :held_record, class_name: "Record", foreign_key: "record_id"
end
