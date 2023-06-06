class ChangeListings < ActiveRecord::Migration[7.0]
  def change
    add_column :listings, :num_bedrooms, :integer, index: true, null: false
  end
end