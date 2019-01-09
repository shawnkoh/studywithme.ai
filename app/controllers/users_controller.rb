class UsersController < ApplicationController
  # Prevent user from accessing edit and update actions if they are not logged in
  before_action :logged_in_user, only: [:index, :edit, :update, :destroy]
  # Prevent user from editing someone else's profile
  before_action :correct_user, only: [:edit, :update]
  # Prevent user from deleting another
  before_action :admin_user, only: :destroy

  def index
    @users = User.all.paginate(page: params[:page], per_page: 10)
  end

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
      @user.send_activation_email
      flash[:info] = "Please check your email to activate your account"
      redirect_to root_url
    else
      render 'new'
    end
  end

  def edit
  end

  def update
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to @user
    else
      render 'edit'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User deleted"
    redirect_to users_url
  end

  private
    # Prevent user from submitting more params than they are supposed to through /signup
    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation, :name)
    end

    # Before filters

    # Confirms a logged-in user
    def logged_in_user
      unless logged_in?
        store_location
        flash[:danger] = "Please log in."
        redirect_to login_url
      end
    end

    # Confirms the correct user
    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end

    # Confirms an admin user
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end