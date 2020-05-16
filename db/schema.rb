# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_05_16_054200) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "holds", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.bigint "record_id", null: false
    t.datetime "begins_on"
    t.datetime "landed_on"
    t.datetime "expires_on"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.uuid "landing_code", null: false
    t.index ["member_id"], name: "index_holds_on_member_id"
    t.index ["record_id"], name: "index_holds_on_record_id"
  end

  create_table "members", force: :cascade do |t|
    t.string "name"
    t.string "surname"
    t.string "email"
    t.string "passcode"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "address"
  end

  create_table "records", force: :cascade do |t|
    t.string "name"
    t.text "summary"
    t.string "language"
    t.bigint "member_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "byline"
    t.string "image_address"
    t.string "goodreads_id"
    t.index ["member_id"], name: "index_records_on_member_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.bigint "member_id", null: false
    t.datetime "claimed"
    t.datetime "expires"
    t.uuid "code", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["member_id"], name: "index_sessions_on_member_id"
  end

  create_table "shipping_charges", force: :cascade do |t|
    t.bigint "hold_id", null: false
    t.bigint "member_id", null: false
    t.float "price"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["hold_id"], name: "index_shipping_charges_on_hold_id"
    t.index ["member_id"], name: "index_shipping_charges_on_member_id"
  end

  add_foreign_key "holds", "members"
  add_foreign_key "holds", "records"
  add_foreign_key "records", "members"
  add_foreign_key "sessions", "members"
  add_foreign_key "shipping_charges", "holds"
  add_foreign_key "shipping_charges", "members"
end
