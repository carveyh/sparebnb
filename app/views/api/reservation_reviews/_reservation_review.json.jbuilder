json.extract! reservation_review,
	:id,
	:reservation_id,
	:reviewer_id,
	:body,
	:private_message,
	:overall_rating,
	:cleanliness,
	:communication,
	:checkin,
	:accuracy,
	:location,
	:value
json.reviewDate reservation_review.reservation.end_date
json.hostId reservation_review.host.id
json.reviewerFirstName reservation_review.reviewer.first_name
json.listingId reservation_review.listing.id