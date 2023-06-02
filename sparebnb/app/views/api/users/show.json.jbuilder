json.user do
	json.extract! @user, :id, :email, :first_name, :last_name, :birth_date, :phone_number, :created_at, :updated_at
end