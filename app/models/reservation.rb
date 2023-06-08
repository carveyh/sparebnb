class Reservation < ApplicationRecord
  validate :start_date, :validate_date_range
  validate :listing_id, :user_does_not_book_own_listing

  belongs_to :reserver,
    foreign_key: :reserver_id,
    class_name: :User
  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing

  private

  def validate_date_range
    if start_date >= end_date
      errors.add('End date must occur after start date')
    end
  end

  def user_does_not_book_own_listing
    if reserver_id == Listing.find(listing_id).host_id
      errors.add('Cannot book own listing')
    end
  end

end
