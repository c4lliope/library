class AddMoneyCharges < ActiveRecord::Migration[6.0]
  def change
    create_table :shipping_charges do |t|
      t.references :hold, null: false, foreign_key: true
      t.references :member, null: false, foreign_key: true
      t.float :price

      t.timestamps
    end
  end
end
