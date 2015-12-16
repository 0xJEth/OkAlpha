class Api::UsersController < ApplicationController
  def new
    render :new
  end

  def create
    redirect_to root_url
  end

  def index
  end

  def show
  end

  def update
  end

  private

  def pokemon_params
  end
end
