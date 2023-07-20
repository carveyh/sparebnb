# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_19_004751) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "listings", force: :cascade do |t|
    t.string "title", null: false
    t.bigint "host_id", null: false
    t.decimal "latitude", null: false
    t.decimal "longitude", null: false
    t.string "address", null: false
    t.string "city", null: false
    t.string "state", null: false
    t.string "zip", null: false
    t.integer "num_beds", null: false
    t.integer "num_baths", null: false
    t.integer "max_guests", null: false
    t.text "description", null: false
    t.integer "base_nightly_rate", null: false
    t.string "category", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "num_bedrooms", null: false
    t.index ["base_nightly_rate"], name: "index_listings_on_base_nightly_rate"
    t.index ["category"], name: "index_listings_on_category"
    t.index ["city"], name: "index_listings_on_city"
    t.index ["host_id"], name: "index_listings_on_host_id"
    t.index ["latitude"], name: "index_listings_on_latitude"
    t.index ["longitude"], name: "index_listings_on_longitude"
    t.index ["max_guests"], name: "index_listings_on_max_guests"
    t.index ["num_baths"], name: "index_listings_on_num_baths"
    t.index ["num_beds"], name: "index_listings_on_num_beds"
    t.index ["state"], name: "index_listings_on_state"
    t.index ["zip"], name: "index_listings_on_zip"
  end

  create_table "reservation_reviews", force: :cascade do |t|
    t.bigint "reservation_id", null: false
    t.bigint "reviewer_id", null: false
    t.text "body", null: false
    t.text "private_message"
    t.integer "overall_rating", null: false
    t.integer "cleanliness", null: false
    t.integer "communication", null: false
    t.integer "checkin", null: false
    t.integer "accuracy", null: false
    t.integer "location", null: false
    t.integer "value", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["reservation_id"], name: "index_reservation_reviews_on_reservation_id"
    t.index ["reviewer_id"], name: "index_reservation_reviews_on_reviewer_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.bigint "reserver_id", null: false
    t.bigint "listing_id", null: false
    t.date "start_date", null: false
    t.date "end_date", null: false
    t.integer "num_guests", null: false
    t.integer "base_nightly_rate", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["end_date"], name: "index_reservations_on_end_date"
    t.index ["listing_id"], name: "index_reservations_on_listing_id"
    t.index ["num_guests"], name: "index_reservations_on_num_guests"
    t.index ["reserver_id"], name: "index_reservations_on_reserver_id"
    t.index ["start_date"], name: "index_reservations_on_start_date"
  end

  create_table "users", force: :cascade do |t|
    t.string "password_digest", null: false
    t.string "email", null: false
    t.string "first_name", null: false
    t.string "last_name", null: false
    t.date "birth_date", null: false
    t.string "phone_number", limit: 10
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["phone_number"], name: "index_users_on_phone_number", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "listings", "users", column: "host_id"
  add_foreign_key "reservation_reviews", "reservations"
  add_foreign_key "reservation_reviews", "users", column: "reviewer_id"
  add_foreign_key "reservations", "listings"
  add_foreign_key "reservations", "users", column: "reserver_id"
end
