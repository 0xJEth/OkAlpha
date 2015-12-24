class Api::LikesController < ApplicationController

  def index
    @likes = Like.all
    render :index
  end

  def create
    @like = Like.create!(like_params)
    render :show
  end

  def destroy
    @like = Like.find(params[:id])
    # @like[:user_id], @like[:liked_id] = nil
    # @like.update_attributes(like_params)
    @like.destroy
    render :index
  end

  private

  def like_params
    params.require(:like).permit(:user_id, :liked_id)
  end
end
