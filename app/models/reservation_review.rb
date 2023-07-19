class ReservationReview < ApplicationRecord
	# validations
	validates :body, length: { in: 1..1000 }
	validates :private_message, length: { in: 1..1000 }, allow_blank: true
	validates :overall_rating, :cleanliness, :communication, :checkin, 
		:accuracy, :location, :value, numericality: { in: 1..5}

	# associations
	belongs_to :reservation,
		foreign_key: :reservation_id,
		class_name: :Reservation

	belongs_to :reviewer,
		foreign_key: :reviewer_id,
		class_name: :User

	# config/routes - RESTful member and collection routes

end
