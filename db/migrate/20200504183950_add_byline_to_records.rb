class AddBylineToRecords < ActiveRecord::Migration[6.0]
  def change
    add_column :records, :byline, :string
  end
end
