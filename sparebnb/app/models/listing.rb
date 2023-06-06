class Listing < ApplicationRecord
  belongs_to :host,
    foreign_key: :host_id,
    class_name: :User

  validates :title, :description, :category, length: { minimum: 1 }
  validates :latitude, :longitude, presence: true
  validates :address, :city, :state, :zip, length: { minimum: 1 }
  validates :num_bedrooms, :num_beds, :num_baths, :max_guests, :base_nightly_rate, numericality: { greater_than: 0 }
end