debugger
json.extract! reservation, 
	:id,
	:reserver_id,
	:listing_id,
	:start_date,
	:end_date,
	:num_guests,
	:base_nightly_rate
json.hostId reservation.host.id
