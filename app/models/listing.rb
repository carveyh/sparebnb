# == Schema Information
#
# Table name: listings
#
#  id                :bigint           not null, primary key
#  title             :string           not null
#  host_id           :bigint           not null
#  latitude          :decimal(, )      not null
#  longitude         :decimal(, )      not null
#  address           :string           not null
#  city              :string           not null
#  state             :string           not null
#  zip               :string           not null
#  num_beds          :integer          not null
#  num_baths         :integer          not null
#  max_guests        :integer          not null
#  description       :text             not null
#  base_nightly_rate :integer          not null
#  category          :string           not null
#  created_at        :datetime         not null
#  updated_at        :datetime         not null
#  num_bedrooms      :integer          not null
#
class Listing < ApplicationRecord
  belongs_to :host,
    foreign_key: :host_id,
    class_name: :User
  
  has_many :reservations,
    foreign_key: :listing_id,
    class_name: :Reservation,
    dependent: :destroy

  has_many :reservers,
    through: :reservations,
    source: :reserver,
    dependent: :destroy

  has_many :reviews,
    through: :reservations,
    source: :review,
    dependent: :destroy

  validates :title, :description, :category, length: { minimum: 1 }
  validates :latitude, :longitude, presence: true
  validates :address, :city, :state, :zip, length: { minimum: 1 }
  validates :num_bedrooms, :num_beds, :num_baths, :max_guests, :base_nightly_rate, numericality: { greater_than: 0 }

  def average_ratings
    categories = %i(overall_rating cleanliness communication checkin accuracy location value)
    averages = {};
    total_reviews = reviews.length
    categories.each do |category|
      averages[category] = total_reviews > 0 ? self.reviews.sum(0) {|review| review[category]} / total_reviews.to_f.round(2) : 0
    end
    averages
  end

end
