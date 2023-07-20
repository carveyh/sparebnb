json.reservations do
	@reservations.each do |reservation|
		json.set! reservation.id do
			json.partial! 'api/reservations/reservation', reservation: reservation
		end
	end
end

json.listings do
	@reservations.each do |reservation|
		json.set! reservation.listing.id do
			# json.extract! reservation.listing,

		end
	end
end

json.hosts do
	@reservations.each do |reservation|
		json.set! reservation.host.id do
			json.extract! reservation.host,
				:first_name
		end
	end
end