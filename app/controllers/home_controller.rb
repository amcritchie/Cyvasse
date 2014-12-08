class HomeController < ApplicationController
  # skip_before_action :ensure_current_user

  def index
  end

  def root
    # @matches = Match.where(home_user_id: session[:user_id]) + Match.where(away_user_id: session[:user_id])
    if current_user != nil
      @matches = current_user.active_matches(session[:user_id])
      @finishedMatches = current_user.finished_matches(session[:user_id]).last(10).reverse
      @lastTenUsers = User.order('created_at DESC').limit(10)
      @favorites = Favorite.where(favoriter: current_user)
    end

  end

  def about
    @rabble = Rabble.attributes
    @spearman = Spearman.attributes
    @elephant = Elephant.attributes
    @light_horse = LightHorse.attributes
    @heavy_horse = HeavyHorse.attributes
    @crossbowman = Crossbowman.attributes
    @catapult = Catapult.attributes
    @trebuchet = Trebuchet.attributes
    @dragon = Dragon.attributes
    @king = King.attributes
    @mountain = Mountain.attributes

    @vangaurd = [Rabble.attributes, Spearman.attributes, Elephant.attributes]
    @cavalry = [LightHorse.attributes, HeavyHorse.attributes]
    @range = [Crossbowman.attributes, Catapult.attributes, Trebuchet.attributes]
    @unique = [Dragon.attributes, King.attributes, Mountain.attributes]
  end

  def contact

  end


end