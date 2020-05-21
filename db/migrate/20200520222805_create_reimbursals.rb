class CreateReimbursals < ActiveRecord::Migration[6.0]
  def change
    create_table :reimbursals do |t|
      t.string :medium
      t.string :price
      t.datetime :paid_on

      t.timestamps
    end
  end
end
