class DestinationsController < ApplicationController
  # before_action :set_destination, only: [:show, :update, :destroy]

  # GET /destinations
  def index
    destinations = Destination.all.order(:name)

    render json: destinations
  end

  # GET /destinations/1
  def show

    destination = Destination.find_by(id: params[:id])

    if destination 
      render json: destination
    else
      render json: destination.errors.full_messages, status: :unprocessable_entity
    end
  end

  # POST /destinations
  def create
    destination = Destination.new(destination_params)

    if destination.save
      render json: destination, status: :created, location: destination
    else
      render json: destination.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /destinations/1
  def update

    destination = Destination.find_by(id: params[:id])

    if destination.update(destination_params)
      render json: destination
    else
      render json: destination.errors, status: :unprocessable_entity
    end
  end

  # DELETE /destinations/1
  def destroy
    destination = Destination.find_by(id: params[:id])
    render json: destination.errors, status: :unprocessable_entity if !destination.destroy
  
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_destination
      destination = Destination.find_by(id: params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def destination_params
      params.require(:destination).permit(:name, 
        :country, 
        :language, 
        :currency)
        # attractions_attributes:[:id, 
        #   :name, 
        #   :category,
        #   :reservations_required,
        #   :cost] ))
    end
end