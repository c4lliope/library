class AddCashHandleToMembers < ActiveRecord::Migration[6.0]
  def change
    add_column :members, :cash_handle, :string
  end
end
