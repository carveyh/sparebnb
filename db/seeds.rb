# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'
# require 'aws-sdk-s3'

ApplicationRecord.transaction do
	puts "Destroying tables..."
	# Unnecessary if using `rails db:seed:replant`
	User.destroy_all
	Listing.destroy_all
	Reservation.destroy_all
	ReservationReview.destroy_all

	puts "Resetting primary keys..."
	ApplicationRecord.connection.reset_pk_sequence!('users')
	ApplicationRecord.connection.reset_pk_sequence!('listings')
	ApplicationRecord.connection.reset_pk_sequence!('reservations')
	ApplicationRecord.connection.reset_pk_sequence!('reservation_reviews')



	# puts "Pulling photos..."
	# # Create an instance of the S3 client
	# s3 = Aws::S3::Client.new(
	# 	region: 'us-east-1',
	# 	credentials: Aws::Credentials.new(
	# 		Rails.application.credentials.aws[:access_key_id],
	# 		Rails.application.credentials.aws[:secret_access_key]
	# 	)
	# )
	
	# # Specify the bucket name and folder prefix
	# bucket_name = 'sparebnb-madison-seeds'
	# folder_prefix = 'photos_for_upload/'
	
	# # Retrieve the list of objects (files) inside the folder
	# response = s3.list_objects_v2(bucket: bucket_name, prefix: folder_prefix)
	
	# # Extract the URLs of the objects
	# photo_urls = response.contents.map do |object|
	# 	object.key # Object key is the file path within the bucket
	# end
	
	# # Shuffle the array of photo URLs randomly
	# shuffled_urls = photo_urls.shuffle
	
	# users.each do |user|
	# 	# Assign the first URL from the shuffled array
	# 	photo_url = shuffled_urls.shift
	
	# 	# Extract the file name from the photo URL
	# 	file_name = File.basename(photo_url)
	
	# 	# Download the photo file from the S3 bucket
	# 	photo_object = s3.get_object(bucket: bucket_name, key: photo_url)
	# 	photo_file = photo_object.body
	
	# 	# Attach the downloaded photo file to the user
	# 	user.photos.attach(io: photo_file, filename: file_name)
	# end


	puts "Creating users..."
	# Demo user WITHOUT phone number:
	no_phone = User.create!(
		email: 'demo@user.io',
		first_name: 'Demo',
		last_name: 'Lition',
		birth_date: Time.new(1993,3,8),
		password: 'dprian83'
	)

	# ######################################################################
	# THIS WAS WORKING BUT FAILED A NEXT ATTEMPT TO DB:SEED - START
	# photo_url = shuffled_urls.shift
	# file_name = File.basename(photo_url)
	# photo_object = s3.get_object(bucket: bucket_name, key: photo_url)
	# photo_file = photo_object.body
	# no_phone.photo.attach(io: photo_file, filename: file_name)
	# THIS WAS WORKING BUT FAILED A NEXT ATTEMPT TO DB:SEED - END
	# ######################################################################

	# file = URI.open('https://sparebnb-madison-seeds.s3.amazonaws.com/Screenshot+2023-05-17+at+10.15.45+PM.png') # <- Adjust the path here if the image is not in app/assets/images
	# no_phone.photo.attach(io: file, filename: 'sample_profile_pic.jpg')

	# In rails c:
	# 	User.first.photo.url - how to actually get URL for frontend
	# 	User.first.photo.filename - for reference

	# In jbuilder:
	# json.user do
	# 	json.extract! @user :first_name, :last_name
	# 	json.photoUrl @user.photo.attached? ? @user.photo.url : nil
	# end




	# Demo user WITH phone number:
	User.create!(
		email: 'phony@user.io',
		first_name: 'Phony',
		last_name: 'Baloney',
		birth_date: Time.new(2003,12,19),
		password: 'dprian83',
		phone_number: '5551239999'
	)

	# Randomized seed data
	12.times do
		User.create!({
			email: Faker::Internet.unique.email,
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			birth_date: Faker::Date.birthday(min_age: 18, max_age: 101),
			password: 'dprian83',
			phone_number: Faker::PhoneNumber.subscriber_number(length:10)
		})
	end
	
	puts "Creating listings..."
	
	desc = ""
	8.times do
		desc += Faker::Movies::HarryPotter.quote + ' '
	end

	source_locations={
		1 => [41.91522955731417, -73.88802726471754, "Charlottesville", "Virginia", "12572", "Architectural wonder in the woods"],
		2 => [42.66513204774507, -78.06544479352814, "Chicago", "Illinois", "14550", "Lake Tent @ The Silverlaken Estate"],
		3 => [41.21157754129034, -73.58021349369768, "Pound Ridge", "New York", "10576", "Guesthouse 1 Hour from NYC"],
		4 => [41.50823306029319, -74.00626147761515, "Bristol", "Rhode Island", "12550", "Mid-century House"],
		5 => [37.73748882712852, -83.5330183878139, "Campton", "Kentucky", "41301", "Pair of Mirrored Treehouses"],
		6 => [41.37693786980471, -72.20529517071341, "East Lyme", "Connecticut", "06333", "Beachfronts & Balconies"],
		7 => [39.19778303424643, -106.80651220066964, "Aspen", "Colorado", "81611", "Modern Chalet near skiing & amenities!"],
		8 => [41.5987164906102, -93.61450370031326, "Des Moines", "Iowa", "50309", "Eiffel Tower Grant Retreat"],
		9 => [41.816036098034864, -124.22828943682804, "Crescent City", "California", "95531", "Cats Castle"],
		10 => [42.29899929788915, -73.3481036281174, "West Stockbridge", "Massachusetts", "01262", "Filomena House"],
		11 => [42.29899929788915, -73.3481036281174, "Kerhonkson", "New York", "12446", "A-Frame in the Catskills"],
		12 => [44.36899664640086, -68.21771873960097, "Bar Harbor", "Maine", "04609", "Downtown Studio"],
		13 => [61.027534198510445, -149.72132122906788, "Anchorage", "Alaska", "99518", "Glass Igloo"]
	}

	13.times do |i|
		Listing.create!({
			title: 
				# Faker::Adjective.positive.capitalize() + ' ' + Faker::Adjective.positive.capitalize() + ' ' + (%w(Apartment House Dwelling Mansion Getaway Resort Tent ) + ['Parking Lot', 'Suspicious Back Alley', 'Port-a-Potty', 'Coding Bootcamp', 'Cardboard Box', "Wendy\'s Dumpster"]).sample + (((0..1).to_a.sample % 2 == 0) ? (' ' + 'Inspired by' + ' ' + Faker::Movie.title) : ""),
				Faker::Adjective.positive.capitalize() + ' ' + Faker::Adjective.positive.capitalize() + ' ' + source_locations[i + 1][5],
			host_id: (1..12).to_a.sample,
			# latitude: rand(-90.0..90.0).truncate(6),
			latitude: source_locations[i + 1][0],
			longitude: source_locations[i + 1][1],
			address: Faker::Address.street_address,
			city: source_locations[i + 1][2],
			state: source_locations[i + 1][3],
			zip: source_locations[i + 1][4],
			num_bedrooms: (1..4).to_a.sample,
			num_beds: (1..4).to_a.sample,
			num_baths: (1..3).to_a.sample,
			max_guests: (1..6).to_a.sample,
			description: Faker::Movies::HarryPotter.quote + ' ' + Faker::Movies::HarryPotter.quote + ' ' + Faker::Movies::HarryPotter.quote + ' ' + Faker::Movies::HarryPotter.quote + ' ',
			base_nightly_rate: (59..759).to_a.sample,
			category: %w(amazing-pools rooms beachfronts).sample
			# category: %w(amazing-pools rooms beachfront treehouses adapted mountains trending mansions majestic arctic woods govt-secret private-escapes home-theater studios gaming-dens fitness creme-de-la-creme green rustic urban tornado camps 420-friendly).sample

		})
	end

	Listing.find(4).update(category: "amazing-pools")
	
	Listing.find(2).update(category: "beachfronts")
	Listing.find(6).update(category: "beachfronts")
	
	Listing.find(1).update(category: "rooms")
	Listing.find(3).update(category: "rooms")
	Listing.find(5).update(category: "rooms")
	Listing.find(7).update(category: "rooms")
	Listing.find(8).update(category: "rooms")
	Listing.find(9).update(category: "rooms")
	Listing.find(10).update(category: "rooms")
	Listing.find(11).update(category: "rooms")
	Listing.find(12).update(category: "rooms")
	Listing.find(13).update(category: "rooms")

	puts "Creating sample reservations..."

	# ### Number of reviews correspond 1:1 to number of reservations ###
	# No res/reviews for listing 1
	# 1 res/review for listing 2
	Reservation.create!({
		reserver_id: (1..13).to_a.sample,
		listing_id: 2,
		start_date: Faker::Date.between(from: '2023-06-12', to: '2023-06-15'),
		end_date: Faker::Date.between(from: '2023-06-16', to: '2023-07-04'),
		num_guests: 1,
		base_nightly_rate: 399
	})

	# 3 res/reviews for listing 3
	3.times do |review_num|
		Reservation.create!({
			reserver_id: (1..13).to_a.sample,
			listing_id: 3,
			start_date: Faker::Date.between(from: '2023-06-12', to: '2023-06-15'),
			end_date: Faker::Date.between(from: '2023-06-16', to: '2023-07-04'),
			num_guests: 1,
			base_nightly_rate: 399
		})
	end

	# 6 res/reviews for listing 4
	6.times do |review_num|
		Reservation.create!({
			reserver_id: (1..13).to_a.sample,
			listing_id: 4,
			start_date: Faker::Date.between(from: '2023-06-12', to: '2023-06-15'),
			end_date: Faker::Date.between(from: '2023-06-16', to: '2023-07-04'),
			num_guests: 1,
			base_nightly_rate: 399
		})
	end

	# 7+ res/reviews for listing 5+
	9.times do |listing_num|
		num_reviews = (7..20).to_a.sample
		num_reviews.times do |review_num|
			Reservation.create!({
				reserver_id: (review_num % 13) + 1,
				listing_id: 4 + 1 + listing_num,
				start_date: Faker::Date.between(from: '2023-07-12', to: '2023-07-15'),
				end_date: Faker::Date.between(from: '2023-07-16', to: '2023-08-04'),
				num_guests: 1,
				base_nightly_rate: 399
			})
		end
	end


	puts "Creating sample reservation reviews..."

	total_num_res = Reservation.all.length / 2
	total_num_res.times do |res_idx|
		sample_body = ""
		(3..7).to_a.sample.times{sample_body += Faker::TvShows::Spongebob.quote + ' '}
		sample_body.strip
		ReservationReview.create!({
			reviewer_id: Reservation.find(res_idx + 1).reserver_id,
			reservation_id: res_idx + 1,
			# body: (1..4).to_a.sample.times{Faker::Movies::LordOfTheRings.quote + ' '} + Faker::Movies::LordOfTheRings.quote,
			body: sample_body,
			private_message: "Oh my goodness gracious. I thought I had reserved a place in " + Faker::Australia.state + ", Australia...nevertheless, it was quite the " + Faker::Adjective.positive + " experience. The complimentary " + Faker::Food.dish + " was an especially nice touch. Thank you for being so flexible and for your hospitality!",
			overall_rating: (3..5).to_a.sample,
			cleanliness: (3..5).to_a.sample,
			communication: (3..5).to_a.sample,
			checkin: (2..5).to_a.sample,
			accuracy: (3..5).to_a.sample,
			location: (4..5).to_a.sample,
			value: (1..5).to_a.sample,
		})
	end
			
	puts "Done!"

end