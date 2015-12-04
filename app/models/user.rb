class User < ActiveRecord::Base
  has_secure_password

  has_many :setups
  has_many :matches
  has_many :messages
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

    match_offers = Match.where(away_user_id: user_id, match_status: 'pending')
    all_matches = match_offers

    match_offerings = Match.where(home_user_id: user_id, match_status: 'pending')
    all_matches = match_offers + match_offers

    match_your_move = Match.where(home_user_id: user_id, whos_turn: 1, match_against: 'human').where.not(match_status: 'finished') + Match.where(away_user_id: user_id, whos_turn: 0).where.not(match_status: 'finished')
    all_matches = match_offers + match_offers + match_your_move

    match_there_move = Match.where(home_user_id: user_id, whos_turn: 0, match_against: 'human').where.not(match_status: 'finished') + Match.where(away_user_id: user_id, whos_turn: 1).where.not(match_status: 'finished')
    all_matches = match_offers + match_offers + match_your_move + match_there_move

    match_vs_computer = Match.where(home_user_id: user_id, match_against: 'computer').where.not(match_status: 'finished')
    all_matches = match_offers + match_offers + match_your_move + match_there_move + match_vs_computer

    home_waiting = Match.where(home_user_id: user_id, home_ready: true, match_against: 'human').where.not(match_status: 'finished').where.not(match_status: 'in progress')
    away_waiting = Match.where(away_user_id: user_id, away_ready: true).where.not(match_status: 'finished').where.not(match_status: 'in progress')
    waiting_on_opponent = home_waiting + away_waiting - match_offerings

    match_pregame_home = Match.where(home_user_id: user_id, match_against: 'human').where.not(match_status: 'finished').where.not(match_status: 'in progress')
    match_pregame_away = Match.where(away_user_id: user_id).where.not(match_status: 'finished').where.not(match_status: 'in progress')

    match_pregame = (match_pregame_away + match_pregame_home) - (waiting_on_opponent + match_offers + match_offerings)

    your_active_matches = match_offers + match_your_move + match_vs_computer + match_pregame + waiting_on_opponent + match_offerings + match_there_move

    your_active_matches.each do |match|

      if match.match_against == 'human'

        # if (Time.now.utc - match.time_of_last_move) > 86400
        if (Time.now.utc - match.time_of_last_move) > 604800 # Older than 7 days

          if match.match_status == 'in progress'

            if match.whos_turn == 1
              resigned_user = User.find(match.home_user_id)
            else
              resigned_user = User.find(match.away_user_id)
            end

            resign(resigned_user, match)

            match.update(match_status: 'finished')
          else
            match.update(match_status: 'finished')
          end
          your_active_matches = your_active_matches - [match]
        end

      end
    end

    your_active_matches
  end

  def cpu_opponent
    user = {id: [2, 3, 4, 5, 6, 7].sample}
    if user[:id] == 2
      start_positions = [
          "11:39|6:38|4:37|19:36|18:35|8:34|10:33|7:32|9:31|5:28|12:27|13:26|15:25|3:24|1:19|17:18|14:17|2:16|16:10|",
          "10:38|9:37|6:36|11:35|7:34|8:33|1:32|3:26|15:25|2:24|18:18|19:17|5:16|16:15|12:10|13:9|4:8|17:3|14:2|",
          "11:38|6:37|7:35|10:34|2:33|9:27|8:26|5:25|19:24|18:23|4:22|14:17|1:16|12:15|15:14|3:9|13:8|17:7|16:1|"
      ]
    elsif user[:id] == 3
      start_positions = [
          "6:38|9:37|11:36|7:35|4:34|18:33|19:32|5:31|8:27|10:26|3:25|15:24|13:23|12:22|16:17|1:16|14:15|17:14|2:8|",
          "8:38|1:37|7:36|6:35|13:34|10:33|9:32|19:27|15:26|5:25|12:24|11:23|18:19|14:18|17:17|4:16|3:15|2:14|16:11|",
          "19:40|18:39|5:38|7:37|10:36|8:35|3:34|1:33|12:30|13:29|4:28|6:27|11:26|9:25|2:24|17:21|14:20|15:19|16:13|"
      ]
    elsif user[:id] == 4
      start_positions = [
          "12:39|2:38|9:37|6:36|7:35|8:34|10:33|11:32|4:28|14:26|5:25|13:24|15:23|3:22|1:19|18:13|19:12|16:8|17:6|",
          "7:38|10:37|8:36|2:35|9:34|11:33|6:32|3:29|16:23|4:19|14:17|5:16|19:15|18:14|15:9|13:8|12:7|1:2|17:1|",
          "9:40|11:39|7:38|1:37|3:34|6:33|10:32|2:31|14:28|5:27|8:26|4:25|15:24|16:19|13:18|12:17|19:11|17:10|18:9|"
      ]
    elsif user[:id] == 5
      start_positions = [
          "18:40|19:39|7:38|6:37|4:36|11:33|9:32|10:31|13:30|12:29|14:28|15:27|5:26|17:21|3:19|2:18|8:17|1:12|16:10|",
          "2:40|9:39|6:38|12:37|4:36|5:35|7:34|10:33|11:32|1:31|3:27|14:26|15:25|13:24|8:23|16:12|18:8|19:7|17:1|",
          "7:39|8:37|11:36|6:35|19:34|10:28|5:27|4:26|15:25|18:24|16:23|9:21|13:18|12:17|2:15|3:11|17:10|14:9|1:7|"
      ]
    elsif user[:id] == 6
      start_positions = [
          "6:26|7:25|9:19|4:18|18:17|19:16|10:15|12:14|8:12|5:11|13:10|2:9|1:8|11:7|16:5|14:4|17:3|15:2|3:1|",
          "11:39|2:38|9:37|7:36|8:35|6:34|10:33|1:32|5:20|3:17|4:16|19:15|18:14|15:9|13:8|12:7|16:5|14:2|17:1|",
          "9:39|2:38|7:37|10:36|11:35|6:34|1:33|8:32|16:19|3:18|4:17|5:16|18:15|19:14|15:10|14:9|12:8|13:7|17:1|"
      ]
    else
      start_positions = [
          "9:39|6:37|8:36|7:35|4:34|19:33|18:32|5:31|10:27|3:26|15:25|1:24|12:23|13:22|11:18|2:17|16:16|14:15|17:14|",
          "5:40|4:39|18:38|12:37|13:36|8:35|10:34|6:33|9:32|7:31|15:30|14:29|19:28|1:26|2:25|17:21|11:20|16:13|3:12|",
          "1:40|7:39|12:38|9:37|11:36|6:35|10:34|8:33|16:32|13:31|4:28|19:27|15:26|14:25|18:24|5:23|2:22|17:17|3:16|"
      ]
    end
    user[:start_position] = start_positions.sample
    user
  end

  def finished_matches(user_id)
    home_games = Match.where(home_user_id: user_id, match_status: 'finished')
    away_games = Match.where(away_user_id: user_id, match_status: 'finished')
    (home_games + away_games).sort_by &:created_at
  end

  def favorites(current_user, count)
    favorites = Favorite.where(favoriter: current_user)
    favorites = favorites.map do |favorite|
      User.find(favorite.favorited)
    end
    a = favorites.sort_by &:last_active
    a.reverse[0..3]
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
