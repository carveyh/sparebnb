class CreateReservationReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reservation_reviews do |t|
      t.references :reservation, null: false, foreign_key: {to_table: :reservations}
      t.references :reviewer, null: false, foreign_key: {to_table: :users}
      t.text :body, null: false
      t.text :private_message
      t.integer :overall_rating, null: false
      t.integer :cleanliness, null: false
      t.integer :communication, null: false
      t.integer :checkin, null: false
      t.integer :accuracy, null: false
      t.integer :location, null: false
      t.integer :value, null: false

      t.timestamps
    end
  end
end
