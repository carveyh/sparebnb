json.reservation do
	json.partial! 'reservation', reservation: @reservation 
end

json.listing do
	json.partial! 'api/listings/listing', listing: @reservation.listing
end

json.host do
	json.partial! 'api/users/user', user: @reservation.host
end