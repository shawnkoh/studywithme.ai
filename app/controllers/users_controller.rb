class UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  # Signup form issues a HTTP POST request to /users URl which is handled by users#create
  def create
    @user = User.new(user_params)
    if @user.save
      log_in @user
      flash[:success] = "Welcome to studywithme.ai!"
      redirect_to @user
      # Handle a successful save
    else
      render 'new'
    end
  end

  private
    # Prevent user from submitting more params than they are supposed to through /signup
    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation, :name)
    end
end