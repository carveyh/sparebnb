class CreateListings < ActiveRecord::Migration[7.0]
  def change
    create_table :listings do |t|
      t.string :title, null: false
      t.references :host, null: false, foreign_key: true
      t.decimal :latitude
      t.decimal :longitude
      t.string :address
      t.string :city
      t.string :state
      t.string :zip
      t.integer :num_beds
      t.integer :num_baths
      t.integer :max_guests
      t.text :description
      t.integer :base_nightly_rate
      t.string :category

      t.timestamps
    end
  end
end
