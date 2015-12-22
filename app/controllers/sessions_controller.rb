class SessionsController < ApplicationController
  def new
  end

  attr_reader :current_user

  def create
    @current_user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )
    if @current_user
      sign_in(@current_user)
      redirect_to root_url
    else
      flash.now[:errors_login] = ["Invalid username or password"]
      render :new
    end
  end

  def destroy
    sign_out
    redirect_to new_session_url
  end
end
