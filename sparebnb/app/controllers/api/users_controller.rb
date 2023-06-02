class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password'] 

  def create
    # render json: user_params # Testing - instead of creating any users, this just returns a response with user_params in json format to check that user_params works
    @user = User.new(user_params)
    if(@user.save)
      login!(@user)
      render json: { user: @user } #BEFORE JBUILDER 'VIEWS' WERE DEFINED
      # render :show #Can use this to render a show page with same folder nesting as namespace/controllername
    else
      render json: { errors: @user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :birth_date, :phone_number, :password)
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