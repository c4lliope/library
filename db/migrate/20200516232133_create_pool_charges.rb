class CreatePoolCharges < ActiveRecord::Migration[6.0]
  def change
    create_table :pool_charges do |t|
      t.string :pool
      t.float :price
      t.string :donor_handle
      t.datetime :paid_on

      t.timestamps
    end
  end
end
