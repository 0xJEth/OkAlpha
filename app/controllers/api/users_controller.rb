class Api::UsersController < ApplicationController
  def new
    render :new
  end

  def index
    users = User.all
    render 'index'
  end

  def create
    user = User.create!(params)
    render json: user
  end

  def show
  end

  def update
    user = User.find(params[:id])
    user.update_attributes(params)
    render json: user
  end

  private

  def user_params
  end
end
