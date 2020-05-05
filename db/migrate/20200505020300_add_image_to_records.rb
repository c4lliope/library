class AddImageToRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :records, :image, :binary
    remove_column :records, :image_url, :string
  end
end
