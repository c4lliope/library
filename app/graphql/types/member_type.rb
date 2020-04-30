module Types
  class MemberType < Types::BaseObject

    field :id, ID, null: false
    field :email, String, null: false
    field :full_name, String, null: false

    def full_name
      [object.name, object.surname].compact.join(" ")
    end
  end
end
