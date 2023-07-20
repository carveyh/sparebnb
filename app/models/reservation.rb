class Reservation < ApplicationRecord
  # This results in error. See alternative below.
  # validate :start_date, :validate_date_range

  validates :end_date, comparison: { greater_than: :start_date }
  # validate :listing_id, :user_does_not_book_own_listing

  belongs_to :reserver,
    foreign_key: :reserver_id,
    class_name: :User
  belongs_to :listing,
    foreign_key: :listing_id,
    class_name: :Listing

  has_one :review,
    foreign_key: :reservation_id,
    class_name: :ReservationReview,
    dependent: :destroy

    # TEST!!! NEW ASSOC
  has_one :host,
    through: :listing,
    source: :host

  private

  # This is not accepted in rails, results in a NilError because start_date is nil.
  # def validate_date_range
  #   debugger
  #   if start_date >= end_date
  #     errors.add('End date must occur after start date')
  #   end
  # end

  # For some reason listing_id is nil here as well.
  # def user_does_not_book_own_listing
  #   debugger
  #   if reserver_id == Listing.find(listing_id).host_id
  #     errors.add('Cannot book own listing')
  #   end
  # end

end
