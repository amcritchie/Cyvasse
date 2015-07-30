class AdminController < ApplicationController
  # skip_before_action :ensure_current_user

  def index
  end

  def home
    # @matches = Match.where(home_user_id: session[:user_id]) + Match.where(away_user_id: session[:user_id])
    if current_user != nil

      # @allUsers = User.all.order('created_at DESC')
      # @allMatches = Match.all.order('created_at DESC')
      #
      # @pvp_matches = Match.where(['away_user_id > ?', 10])
      #
      # @in_progress_matches = Match.where(match_status: 'in progress').order('created_at DESC')
      # @finished_matches = Match.where(match_status: 'finished').order('created_at DESC')
      # @new_matches = Match.where(match_status: 'new').order('created_at DESC')
      # @pending_matches = Match.where(match_status: 'pending').order('created_at DESC')
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

  def rules
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