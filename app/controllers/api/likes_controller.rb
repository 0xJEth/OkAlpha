class Api::LikesController < ApplicationController

  def index
    @likes = Like.all
    render :index
  end

  def create
    @like = Like.create!(profile_params)
    render :show
  end

  def destroy
    @like = Like.find(params[:id])
    @like.update_attributes(like_params)
    render :update
  end

  private

  def profile_params
    params.require(:user).permit(:id, :user_id, :liked_id)
  end
end
