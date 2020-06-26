module Graph
  class GoodreadsResponseType < Graph::BaseObject
    field :id, String, null: false
    field :name, String, null: false
    field :byline, String, null: false
    field :image_address, String, null: false
  end
end
