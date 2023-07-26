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
json.host_first_name listing.host.first_name
json.average_ratings listing.average_ratings
json.num_ratings listing.reviews.length