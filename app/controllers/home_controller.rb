class HomeController < ApplicationController
  # skip_before_action :ensure_current_user

  def index
  end

  def root
    if current_user != nil
      @matches = current_user.active_matches(session[:user_id])
      @finishedMatches = current_user.finished_matches(session[:user_id]).last(4).reverse
      @lastTenUsers = last_active_users(7)
      @favorites = current_user.favorites(current_user,6)
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

  def message_board
    @messages = Message.where(match: 0).order('created_at desc')
    @user = current_user
  end

  def get_board_messages
    @messages = Message.where(match: 0)
    users = {}

    if current_user

      @messages.each do |message|

        users[message.sender] = {
            id: message.sender,
            username: User.find(message.sender).username.capitalize,
            imagePath: User.find(message.sender).image
        }
      end

      render json: {messages: @messages, users: users, currentUser: current_user.id}
    else
      render json: {error: 'no current user'};
    end
  end

  def new_rules

  end
end