class Api::SessionsController < ApplicationController

  def show
    render json: current_user
  end

  def profile_params
    params.require(:user).permit(:username,:gender,:preferred_gender,:email,:bio,:image_url,:id)
  end
end
