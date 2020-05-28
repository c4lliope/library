module Types
  class BankCardType < Types::BaseObject
    field :name, String, null: true
    field :nonce, String, null: false
  end
end
