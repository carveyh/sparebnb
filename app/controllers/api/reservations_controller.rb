class Api::ReservationsController < ApplicationController
  # wrap_parameters include: Reservation.attribute_names + %w(startDate, endDate, numGuests, listingId, reserverId, baseNightlyRate)
  wrap_parameters include: Reservation.attribute_names + ['startDate', 'endDate', 'numGuests', 'listingId', 'reserverId', 'baseNightlyRate']
  # wrap_parameters include: Reservation.attribute_names
  # CHECK WRAP PARAMS - when creating/updating reservation!

  def index
    if params.has_key?(:listing_id)
      @reservations = Reservation.where(listing_id: params[:listing_id])
    elsif params.has_key?(:user_id)
      @reservations = Reservation.where(reserver_id: params[:user_id])
    else
      @reservations = Reservation.all
    end
    render :index
  end

  def show
    @reservation = Reservation.find_by(id: params[:id])
    if @reservation
      render :show
    else
      render json: { errors: ['Reservation not found'] }, status: :unprocessable_entity
    end
  end

  def create
    @reservation = Reservation.new(reservation_params)
    
    # @reservation.reserver_id = current_user.id
    if(@reservation.save)
      render :show 
    else
      render json: { errors: @reservation.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    @reservation = Reservation.find_by(id: params[:id])
    if @reservation && @reservation.update(reservation_params)
      render :show
    else
      render json: { errors: @reservation.errors.messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @reservation = Reservation.find_by(id: params[:id])
    @reservation.destroy if current_user.id == @reservation.reserver_id
    render :show
  end

  # private 

  def reservation_params
    params.require(:reservation).permit(:start_date, :end_date, :num_guests, :base_nightly_rate, :listing_id, :reserver_id)
  end

end
