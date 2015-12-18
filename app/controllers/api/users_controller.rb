class Api::UsersController < ApplicationController
  def new
    render json: user
  end

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create!(profile_params)
    render :create
  end

  def show
    render :show
  end

  def edit
    render :edit
  end

  def update
    p params
    user = User.find(params[:id])
    user.update_attributes(profile_params)
    render json: user
  end

  private

  def profile_params
    params.require(:user).permit(:username,:gender,:preferred_gender,:email,:bio,:image_url,:id)
  end
end
