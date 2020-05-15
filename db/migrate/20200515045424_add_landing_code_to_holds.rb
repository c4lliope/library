class AddLandingCodeToHolds < ActiveRecord::Migration[6.0]
  def change
    add_column :holds, :landing_code, :uuid, null: false, unique: true
  end
end
