class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :title, null: false
      t.references :host, null: false, foreign_key: {to_table: :users}
      t.decimal :latitude, null: false
      t.decimal :longitude, null: false
      t.string :address, null: false
      t.string :city, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.integer :num_beds, null: false
      t.integer :num_baths, null: false
      t.integer :max_guests, null: false
      t.text :description, null: false
      t.integer :base_nightly_rate, null: false
      t.string :category, null: false

      t.timestamps
    end
    add_index :listings, :latitude
    add_index :listings, :longitude
    add_index :listings, :city
    add_index :listings, :state
    add_index :listings, :zip
    add_index :listings, :num_beds
    add_index :listings, :num_baths
    add_index :listings, :max_guests
    add_index :listings, :base_nightly_rate
    add_index :listings, :category
  end
end
