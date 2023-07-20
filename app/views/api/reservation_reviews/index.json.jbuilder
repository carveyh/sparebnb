json.reservation_reviews do
	@reservation_reviews.each do |reservation_review|
		json.set! reservation_review.id do
			json.partial! 'api/reservation_reviews/reservation_review', reservation_review: reservation_review
		end
	end
end

json.reservations do
	@reservation_reviews.each do |reservation_review|
		reservation = reservation_review.reservation
		json.set! reservation.id do
			json.partial! 'api/reservations/reservation', reservation: reservation
		end
	end
end

json.listings do
	@reservation_reviews.each do |reservation_review|
		listing = reservation_review.listing
		json.set! listing.id do
			json.partial! 
		end
	end
end