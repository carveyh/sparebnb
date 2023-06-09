class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.references :reserver, null: false, foreign_key: {to_table: :users}
      t.references :listing, null: false, foreign_key: {to_table: :listings}
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :num_guests, null: false
      t.integer :base_nightly_rate, null: false

      t.timestamps
    end
    add_index :reservations, :start_date
    add_index :reservations, :end_date
    add_index :reservations, :num_guests
  end
end
