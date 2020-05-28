class CreateBankCards < ActiveRecord::Migration[6.0]
  def change
    create_table :bank_cards do |t|
      t.string :name
      t.string :nonce

      t.timestamps
    end
  end
end
