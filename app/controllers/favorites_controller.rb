class FavoritesController < ApplicationController

  def index
    @favorites = Favorite.where(favoriter: current_user)
  end

  def create
    @favorite = Favorite.new(
        favoriter: current_user.id,
        favorited: params[:user_id]
    )
    if @favorite.save
      # flash[:success] = "User Favorited"
    end
    redirect_to root_path
  end

  def destroy
    favorite = Favorite.where(favoriter: current_user.id, favorited: params[:user_id])
    favorite.delete_all
    # flash[:error] = "Favorite Removed"
    render nothing: true
  end

end