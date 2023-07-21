json.listings do
	@listings.each do |listing|
		json.set! listing.id do
			json.partial! 'listing', listing: listing
		end
	end
end

json.hosts do
	@listings.each do |listing|
		host = listing.host
		json.set! host.id do
			json.partial! 'api/users/user', user: host
		end	
	end
end