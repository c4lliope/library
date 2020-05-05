module Types
  class MutationType < Types::BaseObject
    field :add_record, mutation: Mutations::AddRecord
    field :change_record, mutation: Mutations::ChangeRecord
    field :drop_record, mutation: Mutations::DropRecord
    field :sign_in, mutation: Mutations::SignIn
  end
end
