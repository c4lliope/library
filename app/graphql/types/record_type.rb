module Types
  class RecordType < Types::BaseObject
    field :id, ID, null: false
    field :name, String, null: false
    field :summary, String, null: true
    field :language, String, null: true
    field :image_url, String, null: true
    field :member, Types::MemberType, null: false
  end
end
