json.extract! user, 
	:id, 
	:email, 
	:first_name, 
	:last_name, 
	:birth_date, 
	:phone_number, 
	:created_at, 
	:updated_at

# Add AWS profile photo info:
# json.photoUrl @user.photo.attached? ? url_for(@user.photo.url) : nil
# json.photoUrl @user.photo.attached? ? @user.photo.url : nil