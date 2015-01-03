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


    # if user_params[:image] == nil
    #   @user.image.store!(File.open("public/images/tutorial/range.png"))
    #   # @user.image.store!(File.open("public/images/tutorial/range.png"))
    # end


    @user = User.new(user_params)
    @user.username = @user.username.downcase
    @user.email = @user.email.downcase
    @user.wins = 0
    @user.losses = 0
    @user.admin = false
    @user.account_type = 'basic'
    @user.email_confirmed = false
    @user.last_active = Time.new
    @user.unit_outlines = true

    if @user.save
      Keen.publish(:sign_ups, {:username => @user.username}) if Rails.env.production?
      session[:user_id] = @user.id
      redirect_to create_computer_match_path, method: :post
    else
      render :new
    end
  end

  def extra_info_open
    @user = current_user
    @user.update(show_extra_info: true)
    render nothing: true
  end

  def extra_info_close
    @user = current_user
    @user.update(show_extra_info: false)
    render nothing: true
  end

  def toggle_outlines
    @user = current_user
    if (@user.unit_outlines)
      @user.update(
          unit_outlines: false
      )
    else
      @user.update(
          unit_outlines: true
      )
    end
    render nothing: true
  end

  def update_last_active
    @user = current_user
    @user.update(
        last_active: Time.new
    )
    render nothing: true
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
    params.require(:user).permit(:username, :email, :password, :image, :first_name, :last_name)
  end

end
