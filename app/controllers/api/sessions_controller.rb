class Api::SessionsController < ApplicationController

  def show
    p current_user
    render json: current_user
  end

  def profile_params
    params.require(:user).permit(:username,:gender,:preferred_gender,:email,:bio,:image_url,:id,:updated_at)
  end
end
