class CreateMembers < ActiveRecord::Migration[6.0]
  def change
    create_table :members do |t|
      t.string :name
      t.string :surname
      t.string :email
      t.string :passcode

      t.timestamps
    end
  end
end
