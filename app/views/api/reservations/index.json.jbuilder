json.reservations do
	@reservations.each do |reservation|
		json.set! reservation.id do
			json.partial! 'reservation', reservation: reservation
		end
	end
end

json.listings do
	@reservations.each do |reservation|
		json.set! reservation.listing.id do
			json.partial! 'api/listings/listing', listing: reservation.listing
		end
	end
end

json.hosts do
	@reservations.each do |reservation|
		json.set! reservation.host.id do
			json.partial! 'api/users/user', user: reservation.host
		end
	end
end