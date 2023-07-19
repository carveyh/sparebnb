json.reservation_reviews do
	@reservation_reviews.each do |reservation_review|
		json.set! reservation_review.id do
			json.partial! 'api/reservation_reviews/reservation_review', reservation_review: reservation_review
		end
	end
end

