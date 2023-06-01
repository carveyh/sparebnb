# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
	puts "Destroying tables..."
	# Unnecessary if using `rails db:seed:replant`
	User.destroy_all

	puts "Resetting primary keys..."
	ApplicationRecord.connection.reset_pk_sequence!('users')

	puts "Creating users..."
	# Demo user WITHOUT phone number:
	User.create!(
		email: 'demo@user.io',
		first_name: 'Demo',
		last_name: 'Lition',
		birth_date: Time.new(1993,3,8),
		password: 'password'
	)

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
	10.times do
		User.create!({
			email: Faker::Internet.unique.email,
			first_name: Faker::Name.first_name,
			last_name: Faker::Name.last_name,
			birth_date: Faker::Date.birthday(min_age: 18, max_age: 101),
			password: 'password',
			phone_number: Faker::PhoneNumber.subscriber_number(length:10)
		})
	end

	puts "Done!"
end