class Record < ApplicationRecord
  include PgSearch::Model
  pg_search_scope :search,
    against: {
      name: "A",
      byline: "A",
      summary: "B",
    },
    using: {
      tsearch: {dictionary: "english"}
    }

  belongs_to :member
  has_many :holds
end
