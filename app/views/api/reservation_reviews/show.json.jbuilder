json.reservation_review do
	json.partial! 'api/reservation_reviews/reservation_review', reservation_review: @reservation_review
end