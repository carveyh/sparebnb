json.reservation_review do
	json.partial! 'reservation_review', reservation_review: @reservation_review
end

json.reservation do
	json.partial! 'api/reservations/reservation', reservation: @reservation_review.reservation
end

json.listing do
	json.partial! 'api/listings/listing', listing: @reservation_review.listing
end

json.host do
	json.partial! 'api/users/user', user: @reservation_review.host
end