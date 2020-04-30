class CreateRecords < ActiveRecord::Migration[6.0]
  def change
    create_table :records do |t|
      t.string :name
      t.text :summary
      t.string :language
      t.string :image_url
      t.references :member, null: false, foreign_key: true

      t.timestamps
    end
  end
end
