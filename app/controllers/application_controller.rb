class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  # before_action :ensure_authenticated_user


  def current_user
    User.find_by(id: session[:user_id])
  end

  def enemy_user
    if current_user.id == @match.home_user_id
      User.find(@match.away_user_id)
    else
      User.find(@match.home_user_id)
    end
  end

  def random_active_user
    active_users = User.where("id > 10 AND id != #{current_user.id}").limit(10).order('last_active asc')
    active_users.shuffle[0].id
  end

  helper_method :current_user, :enemy_user

end
