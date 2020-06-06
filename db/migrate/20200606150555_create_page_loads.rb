class CreatePageLoads < ActiveRecord::Migration[6.0]
  def change
    create_table :page_loads do |t|
      t.datetime :on
      t.string :label
      t.string :address

      t.timestamps
    end
  end
end
