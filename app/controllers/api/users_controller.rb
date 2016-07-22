class Api::UsersController < ApplicationController
  def new
  end

  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.create!(profile_params)
    render :show
  end

  def show
    @user = User.find(params[:id])
    render :show
  end

  def edit
    render :update
  end

  def update
    @user = User.find(params[:id])
    @user.update_attributes(profile_params)
    render :update
  end

  private

  def profile_params
    params.require(:user).permit(:username,:gender,:preferred_gender,:email,:bio,:image_url,:id)
  end
end
