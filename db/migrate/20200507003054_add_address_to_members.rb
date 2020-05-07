class AddAddressToMembers < ActiveRecord::Migration[6.0]
  def change
    add_column :members, :address, :string
  end
end
