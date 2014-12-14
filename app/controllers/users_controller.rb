class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
  end

  def show
  end

  def new
    @user = User.new
  end

  def edit
  end

  def create
    @user = User.new(user_params)
    @user.wins = 0
    @user.losses = 0
    @user.admin = false
    @user.account_type = 'basic'
    @user.email_confirmed = false

    if user_params['image'] == nil
      p '?'*800

    else
      p '{'*800
    end



    if @user.save
      Keen.publish(:sign_ups, { :username => @user.username }) if Rails.env.production?
      flash[:success] = "Welcome to Cyvasse #{@user.username}"
      session[:user_id] = @user.id
      redirect_to create_computer_match_path, method: :post
    else
      render :new
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    if current_user.id == params[:id].to_i
      @user = User.find(params[:id])
      @user.update(user_params)
      redirect_to root_path
    else
      redirect_to :back
    end
  end

  # DELETE /users/1
  # DELETE /users/1.json
  def destroy
    @user.destroy
    respond_to do |format|
      format.html { redirect_to users_url, notice: 'User was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def user_params
      # p '------==='*90
      # p params
      # p '**'
      # p params[:user]
      # p '=='
      # p params[:user][:image]
      # p '++'
      # if params[:user][:image] == nil
      #   params[:user][:image] = '/images/svgs/king.svg'
      # end
      params.require(:user).permit(:username, :email, :password, :image, :first_name, :last_name)
    end
end
