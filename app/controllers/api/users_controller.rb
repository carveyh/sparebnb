class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'firstName', 'lastName', 'birthDate'] 

  def show
    @user = User.find_by(id: params[:id])
    if @user
      render :show
    else
      render json: { errors: ['User not found.']}, status: :unprocessable_entity
    end
  end

  def create
    @user = User.new(user_params)
    if(@user.save)
      login!(@user)
      render :show 
    else
      render json: { errors: @user.errors.messages }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :birth_date, :birthDate, :phone_number, :password)
  end
end