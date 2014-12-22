class User < ActiveRecord::Base
  has_secure_password

  has_many :matches
  has_many :favorites
  has_many :setups

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

    match_offers = Match.where(away_user_id: user_id, match_status: 'pending')
    match_offerings = Match.where(home_user_id: user_id, match_status: 'pending')

    match_your_move = Match.where(home_user_id: user_id, whos_turn: 1).where.not(match_status: 'finished') + Match.where(away_user_id: user_id, whos_turn: 0).where.not(match_status: 'finished')
    match_there_move = Match.where(home_user_id: user_id, whos_turn: 0).where.not(match_status: 'finished') + Match.where(away_user_id: user_id, whos_turn: 1).where.not(match_status: 'finished')

    home_waiting = Match.where(home_user_id: user_id, home_ready: true).where.not(match_status: 'finished').where.not(match_status: 'in progress')
    away_waiting = Match.where(away_user_id: user_id, away_ready: true).where.not(match_status: 'finished').where.not(match_status: 'in progress')
    waiting_on_opponent = home_waiting + away_waiting - match_offerings

    match_pregame_home = Match.where(home_user_id: user_id).where.not(match_status: 'finished').where.not(match_status: 'in progress')
    match_pregame_away = Match.where(away_user_id: user_id).where.not(match_status: 'finished').where.not(match_status: 'in progress')

    match_pregame = (match_pregame_away + match_pregame_home) - (waiting_on_opponent + match_offers + match_offerings)

    match_offers + match_your_move + match_pregame + match_offerings + waiting_on_opponent + match_there_move
  end

  def finished_matches(user_id)
    home_games = Match.where(home_user_id: user_id, match_status: 'finished')
    away_games = Match.where(away_user_id: user_id, match_status: 'finished')
    (home_games + away_games).sort_by &:created_at
  end

  def resign(quitter, match)

    if quitter.id == match.home_user_id
      opponent = User.find(match.away_user_id)
    else
      opponent = User.find(match.home_user_id)
    end

    quitter.update_attribute(:losses, quitter.losses+1)
    opponent.update_attribute(:wins, opponent.wins+1)
  end

end
