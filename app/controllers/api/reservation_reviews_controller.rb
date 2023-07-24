class Api::ReservationReviewsController < ApplicationController

  wrap_parameters include: ReservationReview.attribute_names + [
    'reservationId', 'reviewerId', 'body', 'privateMessage',
    'overallRating', 'cleanliness', 'communication',
    'checkin', 'accuracy', 'location', 'value'
  ]

  def index
    # /api/users/:user_id/reservation_reviews
    # /api/listings/:listing_id/reservation_reviews
    # /api/reservations/:reservation_id/reservation_review
    if params.has_key?(:user_id)
      @reservation_reviews = ReservationReview.where(reviewer_id: params[:user_id])
    elsif params.has_key?(:listing_id)
      @listing = Listing.find(params[:listing_id])
      @reservation_reviews = @listing.reviews
    # elsif params.has_key?(:reservation_id)
    #   # i-var plural just for consistency in json view template
    #   # Actually, :index as a restful route for a singular resource is not recognized by Rails, need to move to #show in controller
    #   @reservation_reviews = ReservationReview.find(reservation_id: params[:reservation_id])
    end
    render :index
  end

  def show
    # /api/reservation_reviews/:id
    if params.has_key?(:reservation_id)
      @reservation_review = ReservationReview.find_by(reservation_id: params[:reservation_id])
    else
      @reservation_review = ReservationReview.find_by(id: params[:id])
    end
    if @reservation_review
      render :show
    else
      render json: { errors: ['Review not found'] }, status: :unprocessable_entity
    end

  end

  def create
    # /api/reservations/:reservation_id/reservation_review
    @reservation_review = ReservationReview.new(reservation_review_params)
    if(@reservation_review.save)
      render :show
    else
      render json: { errors: @reservation_review.errors.messages }, status: :unprocessable_entity
    end
  end

  def update
    # /api/reservation_reviews/:id
    @reservation_review = ReservationReview.find_by(id: params[:id])
    if @reservation_review && @reservation_review.update(reservation_review_params)
      render :show
    else
      render json: { errors: @reservation_review.errors.messages }, status: :unprocessable_entity
    end
  end

  def destroy
    # /api/reservation_reviews/:id
    @reservation_review = ReservationReview.find_by(id: params[:id])
    @reservation_review.destroy if current_user.id == @reservation_review.reviewer_id
    render :show
  end

  private

  def reservation_review_params
    params.require(:reservation_review).permit(
      :reservation_id, :reviewer_id, :body, :private_message, :overall_rating, 
      :cleanliness, :communication, :checkin, :accuracy, :location, :value
    )
  end
end
