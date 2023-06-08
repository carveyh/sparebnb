class Reservation < ApplicationRecord
  validates 

  belongs_to :reserver,
    foreign_key: :reserver_id,
    class_name: :User
  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing

  private

  def validate_date_range

  end

end
