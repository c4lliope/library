class RemoveImageFromRecords < ActiveRecord::Migration[6.0]
  def change
    remove_column :records, :image, :binary
  end
end
