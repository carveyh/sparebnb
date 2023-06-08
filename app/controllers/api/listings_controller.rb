class Api::ListingsController < ApplicationController
  wrap_parameters include: Listing.attribute_names
  # CHECK WRAP PARAMS - when creating/updating listing!

  def index
    # BACKEND FILTERING
    if params[:category]
      @listings = Listing.where(category: params[:category]) #where for retrieving all matching record
      # @listings = Listing.find_by(category: params[:category]) #find_by for retrieving one matching record
    else
      @listings = Listing.all
    end
    render :index
  end
  
  def show
    @listing = Listing.find_by(id: params[:id])
    if @listing
      render :show
    else
      render json: { errors: ['Listing not found...check out some other amazing places!'] }, status: :unprocessable_entity
    end
  end

  private

  def listing_params
    params.require(:listing).permit(:category)
  end
end
