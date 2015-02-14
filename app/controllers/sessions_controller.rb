class SessionsController < ApplicationController

  skip_before_filter :ensure_authenticated_user

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(username: params[:user][:username].downcase)
    if @user == nil
      @user = User.find_by(email: params[:user][:username].downcase)
    end
    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      @user.update(last_active: Time.new)
      if @user[:admin]
        redirect_to admin_path
      else
        Keen.publish(:logins, { :username => @user.username }) if Rails.env.production?
        flash[:success] = "Welcome back #{@user.username}"
        redirect_to root_path
      end
    else
      @user = User.new(email: params[:user][:email])
      flash[:error] = "Username / password is invalid."
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path
  end

end