class CreateSessions < ActiveRecord::Migration[6.0]
  def change
    create_table :sessions do |t|
      t.references :member, null: false, foreign_key: true
      t.datetime :claimed
      t.datetime :expires
      t.uuid :code, null: false, unique: true

      t.timestamps
    end
  end
end
