class AddImageAddressToRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :records, :image_address, :string
  end
end
