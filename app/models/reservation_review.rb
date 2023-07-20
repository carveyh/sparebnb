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

	# belongs_to :listing, #This will trigger a `ArgumentError - Unknown key: :through` error upon clicking to delete a reservation on website.
	has_one :listing,
		through: :reservation,
		source: :listing

	# belongs_to :listing, #This will trigger a `ArgumentError - Unknown key: :through` error upon clicking to delete a reservation on website.
	has_one :host,
		through: :reservation,
		source: :host

	# config/routes - RESTful member and collection routes
	# controller - define actions corresponding to RESTful routes
	# json view templates
end
