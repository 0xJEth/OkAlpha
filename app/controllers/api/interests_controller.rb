class Api::InterestsController < ApplicationController

  def index
    @interests = Interest.all
    render :index
  end

  def create
    @interest = Interest.create!(interest_params)
    render :show
  end

  def destroy
    @interest = Interest.find(params[:id])
    @interest.destroy
    render :index
  end

  private

  def interest_params
    params.require(:interest).permit(:user_id, :interest, :created_at)
  end
end
