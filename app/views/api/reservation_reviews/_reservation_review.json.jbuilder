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
json.listingId reservation_review.listing.id