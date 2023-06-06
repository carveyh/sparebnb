json.listings do
	@listings.each do |listing|
		json.set! listing.id do
			json.extract! listing,
				:id,
				:title,
				:host_id,
				:latitude,
				:longitude,
				:address,
				:city,
				:state,
				:zip,
				:num_beds,
				:num_baths,
				:num_bedrooms,
				:max_guests,
				:description,
				:base_nightly_rate,
				:category,
				:created_at,
				:updated_at
		end
	end
end