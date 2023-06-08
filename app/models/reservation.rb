class Reservation < ApplicationRecord
  validate :start_date, :validate_date_range

  belongs_to :reserver,
    foreign_key: :reserver_id,
    class_name: :User
  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing

  private

  def validate_date_range
    if start_date > end_date
      errors.add('End date must occur after start date')
    end
  end

end
