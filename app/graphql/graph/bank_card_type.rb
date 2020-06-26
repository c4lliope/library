module Graph
  class BankCardType < Graph::BaseObject
    field :name, String, null: true
    field :nonce, String, null: false
  end
end
