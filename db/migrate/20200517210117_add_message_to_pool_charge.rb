class AddMessageToPoolCharge < ActiveRecord::Migration[6.0]
  def change
    add_column :pool_charges, :message, :string
  end
end
