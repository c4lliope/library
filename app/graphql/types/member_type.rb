module Types
  class MemberType < Types::BaseObject

    field :id, ID, null: false
    field :email, String, null: false
    field :name, String, null: true
    field :surname, String, null: true
    field :address, String, null: true
    field :cash_handle, String, null: true
    
    field :holds, [Types::HoldType], null: false
    field :shipping_charges, [Types::ShippingChargeType], null: false

    def full_name
      [object.name, object.surname].compact.join(" ")
    end
  end
end
