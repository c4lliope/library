class CreateBookings < ActiveRecord::Migration[6.0]
  def change
    create_table :bookings do |t|
      t.references :member, null: false, foreign_key: true
      t.references :record, null: false, foreign_key: true
      t.datetime :begins_on
      t.datetime :landed_on
      t.datetime :expires_on

      t.timestamps
    end
  end
end
