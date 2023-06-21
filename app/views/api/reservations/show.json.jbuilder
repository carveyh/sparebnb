json.reservation do
	debugger
	json.partial! 'api/reservations/reservation', reservation: @reservation 
end