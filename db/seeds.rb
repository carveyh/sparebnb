# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

require 'open-uri'
require 'aws-sdk-s3'

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
		password: 'password'
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
		password: 'password',
		phone_number: '5551239999'
	)

	# Randomized seed data
	12.times do
		User.create!({
			email: Faker::Internet.unique.email,
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			birth_date: Faker::Date.birthday(min_age: 18, max_age: 101),
			password: 'password',
			phone_number: Faker::PhoneNumber.subscriber_number(length:10)
		})
	end
	
	puts "Creating listings..."
	
	desc = ""
	8.times do
		desc += Faker::Movies::HarryPotter.quote + ' '
	end

	13.times do
		Listing.create!({
			title: 
				Faker::Adjective.positive.capitalize() + ' ' + Faker::Adjective.positive.capitalize() + ' ' + (%w(Apartment House Dwelling Mansion Getaway Resort Tent ) + ['Parking Lot', 'Suspicious Back Alley', 'Port-a-Potty', 'Coding Bootcamp', 'Cardboard Box', "Wendy\'s Dumpster"]).sample + (((0..1).to_a.sample % 2 == 0) ? (' ' + 'Inspired by' + ' ' + Faker::Movie.title) : ""),
			host_id: (1..12).to_a.sample,
			latitude: rand(-90.0..90.0).truncate(6),
			longitude: rand(-180.0..180.0).truncate(6),
			address: Faker::Address.street_address,
			city: Faker::Address.city,
			state: Faker::Address.state,
			zip: Faker::Address.zip_code,
			num_bedrooms: (1..20).to_a.sample,
			num_beds: (1..20).to_a.sample,
			num_baths: (1..10).to_a.sample,
			max_guests: (1..20).to_a.sample,
			description: Faker::Movies::HarryPotter.quote + ' ' + Faker::Movies::HarryPotter.quote + ' ' + Faker::Movies::HarryPotter.quote + ' ' + Faker::Movies::HarryPotter.quote + ' ',
			base_nightly_rate: (59..2999).to_a.sample,
			category: %w(amazing-pools rooms beachfront).sample
			# category: %w(amazing-pools rooms beachfront treehouses adapted mountains trending mansions majestic arctic woods govt-secret private-escapes home-theater studios gaming-dens fitness creme-de-la-creme green rustic urban tornado camps 420-friendly).sample

		})
	end

	Listing.find(4).update(category: "amazing-pools")
	
	Listing.find(2).update(category: "beachfront")
	Listing.find(6).update(category: "beachfront")
	
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


	3.times do |i|
		Reservation.create!({
			reserver_id: 1,
			listing_id: i + 1,
			start_date: '2023-09-0' + (i + 1).to_s,
			end_date: '2023-09-0' + (i + 2).to_s,
			num_guests: 1,
			base_nightly_rate: 399
		})
	end

	3.times do |i|
		# listing_id = rand(1..1)
		Reservation.create!({
			reserver_id: i + 1,
			listing_id: 1,
			start_date: Faker::Date.between(from: '2023-07-12', to: '2023-07-15'),
			end_date: Faker::Date.between(from: '2023-07-16', to: '2023-08-04'),
			num_guests: 1,
			base_nightly_rate: 399
		})
	end




	puts "Creating sample reservation reviews..."

	3.times do |i|
		ReservationReview.create!({
			reviewer_id: 1,
			reservation_id: i + 1,
			body: Faker::Movies::LordOfTheRings.quote + ' ' + Faker::Movies::LordOfTheRings.quote,
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

	3.times do |i|
		ReservationReview.create!({
			reviewer_id: i + 1,
			reservation_id: i + 4,
			body: Faker::Movies::LordOfTheRings.quote + ' ' + Faker::Movies::LordOfTheRings.quote,
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