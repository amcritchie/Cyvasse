class User < ActiveRecord::Base
  has_secure_password

  has_many :matches

  mount_uploader :image, AvatarUploader

  validates_presence_of :username, :email, :password_digest, :image
  validates_uniqueness_of :username, :email
  validates :password_digest, length: {minimum: 4}

  def my_first_name
    self.first_name.capitalize
  end

  def full_name
    first_name.capitalize + " " + last_name.capitalize
  end

  def name_or_username
    if ((first_name == '') || (last_name == '')) || ((first_name == nil) || (last_name == nil))
      username.capitalize
    else
      first_name.capitalize + " " + last_name.capitalize
    end
  end

  def first_name_or_username(user)
    if (user.first_name == '') || (user.first_name == nil)
      user.username.capitalize
    else
      user.first_name.capitalize
    end
  end

  def total_matches(user_id)
    home_games = Match.where(home_user_id: user_id).length
    away_games = Match.where(away_user_id: user_id).length
    total_game = home_games + away_games
  end
end
