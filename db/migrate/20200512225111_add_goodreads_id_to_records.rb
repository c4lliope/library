class AddGoodreadsIdToRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :records, :goodreads_id, :string
  end
end
