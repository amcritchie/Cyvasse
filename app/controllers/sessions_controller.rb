class SessionsController < ApplicationController

  skip_before_filter :ensure_authenticated_user

  def new
    @user = User.new
  end

  def create
    @user = User.find_by(username: params[:user][:username])

    if @user && @user.authenticate(params[:user][:password])
      session[:user_id] = @user.id
      flash[:success] = "Welcome, #{@user.first_name}!"
      redirect_to "/"
    else
      @user = User.new(email: params[:user][:email])
      @user.errors[:base] << "Username / password is invalid."
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to "/"
  end

end