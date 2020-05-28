class ChangeDonorHandleToBankCard < ActiveRecord::Migration[6.0]
  def change
    rename_column :pool_charges, :donor_handle, :bank_card_nonce
  end
end
