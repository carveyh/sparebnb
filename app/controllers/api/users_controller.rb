class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'firstName', 'lastName', 'birthDate'] 

  def create
    @user = User.new(user_params)
    if(@user.save)
      login!(@user)
      render :show #Can use this to render a show page with same folder nesting as namespace/controllername
    else
      render json: { errors: @user.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :birth_date, :birthDate, :phone_number, :password)
  end
end

# # TEST signup params
# signupRequestOptions = {
#   method: 'POST',
#   headers: { 'Content-Type': 'application/json' },
#   body: JSON.stringify({ 
#     email: 'coolemail@hotmail.net',     
#     password: 'starwars',
#       first_name: 'bob',
#       last_name: 'barker',
#       birth_date: '2003-08-03',
#       phone_number: '5551230000'
#   })
# }
# await fetch('/api/users', signupRequestOptions).then(res => res.json())