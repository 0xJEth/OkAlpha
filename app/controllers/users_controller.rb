class UsersController < ApplicationController
  helper_method :create

  attr_reader :session_flag

  def new
    @user = User.new
    @session_flag = false
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in(@user)
      redirect_to "/#/profile/#{@user.id}"
    else
      flash.now[:errors_signup] = @user.errors.full_messages
      @session_flag = false
      render :new
    end
  end

  private
  def user_params
    params.require(:user).permit(:password, :username)
  end

end
