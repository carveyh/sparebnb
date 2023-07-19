class Api::ReservationReviewsController < ApplicationController

  wrap_parameters include: ReservationReview.attribute_names + [
    'reservationId', 'reviewerId', 'body', 'privateMessage',
    'overallRating', 'cleanliness', 'communication',
    'checkin', 'accuracy', 'location', 'value'
  ]

  def index
    
  end

  def show
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def reservation_review_params
    params.require(:reservation_review).permit(
      :reservation_id, :reviewer_id, :body, :private_message, :overall_rating, 
      :cleanliness, :communication, :checkin, :accuracy, :location, :value
    )
  end
end
