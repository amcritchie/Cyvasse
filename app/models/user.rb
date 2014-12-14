class User < ActiveRecord::Base
  has_secure_password

  has_many :matches
  has_many :favorites

  mount_uploader :image, AvatarUploader

  validates_presence_of :username, :email, :password_digest
  validates_uniqueness_of :username, :email
  validates :password_digest, length: {minimum: 8}
  validates :username, length: {maximum: 10, minimum: 4}

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
    (home_games + away_games).sort_by &:created_at
  end

  def active_matches(user_id)
    home_games = Match.where(home_user_id: user_id).where.not(match_status: 'finished')
    away_games = Match.where(away_user_id: user_id).where.not(match_status: 'finished')
    (home_games + away_games).sort_by &:created_at
  end

  def finished_matches(user_id)
    home_games = Match.where(home_user_id: user_id, match_status: 'finished')
    away_games = Match.where(away_user_id: user_id, match_status: 'finished')
    (home_games + away_games).sort_by &:created_at
  end

  # def add_win
  #   user = User.find(user_id)
  #   wins = user.wins
  #   p '++++'*70
  #   p self
  #   p user
  #   p wins
  #   user.update(
  #       wins: wins + 1
  #   )
  # end

  def resign(quitter, match)
    if quitter.id == match.home_user_id
      opponent = User.find(match.away_user_id)
    else
      opponent = User.find(match.home_user_id)
    end
    quitter.update_attribute(:losses, opponent.wins+1)
    opponent.update_attribute(:wins, opponent.wins+1)
  end

end
