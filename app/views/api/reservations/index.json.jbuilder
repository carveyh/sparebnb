json.reservations do
	@reservations.each do |reservation|
		json.set! reservation.id do
			json.extract! reservation,
				:id,
				:start_date,
				:end_date,
				:num_guests,
				:base_nightly_rate
		end
	end
end