class RenameBookingsToHolds < ActiveRecord::Migration[6.0]
  def change
    rename_table :bookings, :holds
  end
end
