json.listing do
	json.partial! 'listing', listing: @listing
end

json.host do
	json.partial! 'api/users/user', user: @listing.host
end