class Match < ActiveRecord::Base
  belongs_to :user
  has_many :world_statuses

  # validates :match_against, presence: true
  # validates_presence_of :match_against

  def initialize(*args)
    super
    # hash = {}
  end

  def active_matches(user_id)
    # pending_games = Match.where(away_user_id: user_id, match_status: 'pending')
    # pending_games + home_games + away_games
    # pending_games
    # return false
  home_games = Match.where(home_user_id: user_id)
    away_games = Match.where(away_user_id: user_id)
    home_games + away_games
  end

end
