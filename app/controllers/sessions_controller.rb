class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(email: params[:session][:email].downcase)
    if user && user.authenticate(params[:session][:password])
      if user.activated?
        log_in user
        params[:session][:remember_me] == '1' ? remember(user) : forget(user)
        redirect_back_or user
      else
        flash.now[:warning] = "Your account has not been activated. Please check your email for the activation link."
        render 'new'
      end
    else
      reset_password = view_context.link_to("Forgot your password? Reset it here.", new_password_reset_path)
      flash.now[:danger] = "Invalid email/password. #{reset_password}".html_safe
      render 'new'
    end
  end

  def destroy
    log_out if logged_in?
    redirect_to root_url
  end
end
