json.reservation do
	json.extract! @reservation,
		:id,
		:start_date,
		:end_date,
		:num_guests,
		:base_nightly_rate
end