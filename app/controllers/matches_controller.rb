class MatchesController < ApplicationController
  before_action :set_match, only: [:show, :edit, :update, :destroy]

  def index
    @matches = Match.all
  end

  def show
    @messages = Message.where(match: params[:id]).order('created_at desc')
  end

  def finished_games
    @matches = current_user.finished_matches(session[:user_id]).reverse
  end

  def match_status
    @match = Match.find(params[:match_id])

    # render json: game_accepted
    render json: (@match.match_status != 'pending') ? true : false
  end

  def match_home_ready
    @match = Match.find(params[:match_id])
    if @match.match_against == 'human'
      render json: @match.home_ready
    else
      render json: false
    end
  end

  def match_away_ready
    @match = Match.find(params[:match_id])
    if @match.match_against == 'human'
      render json: @match.away_ready
    else
      render json: false
    end
  end

  def match_away_units_pos
    @match = Match.find(params[:match_id])
    render json: {data: @match.away_units_position}
  end

  def match_home_units_pos
    @match = Match.find(params[:match_id])
    render json: {data: @match.home_units_position}
  end

  def who_goes_first
    @match = Match.find(params[:match_id])
    render json: {data: @match.who_started}
  end

  def check_turn
    @match = Match.find(params[:match_id])
    render json: {
        turn: @match.turn,
        last_move: @match.last_move,
        match_status: @match.match_status,
        who_started: @match.who_started,
        home_units: @match.home_units_position,
        away_units: @match.away_units_position,
        utility_saved_hex: @match.utility_saved_hex
    }
  end

  def get_match_messages
    @messages = Message.where(match: params[:match_id])
    render json: {
        messages: @messages
    }
  end

  def create_match_vs_computer
    opponent = current_user.cpu_opponent
    @match = Match.new(
        time_of_last_move: Time.now.utc,
        home_user_id: current_user.id,
        away_user_id: opponent[:id],
        home_ready: false,
        away_ready: true,
        match_status: 'new',
        match_against: 'computer',
        away_units_position: opponent[:start_position],
        turn: 0,
        utility_saved_hex: 95
    )

    if (current_user.active_matches(current_user).length <= 9) || (current_user.account_type == 'premium')
      @match.save
      redirect_to match_path(@match)
    else
      flash[:cant_find_username] = "You have reached max games"
      flash[:error] = "You may only have 10 active games with a basic account."
      redirect_to :back
    end
  end

  def create_match_vs_player

    @match = Match.new(
        time_of_last_move: Time.now.utc,
        home_user_id: current_user.id,
        home_ready: false,
        away_ready: false,
        match_status: 'pending',
        match_against: 'human',
        turn: 0,
        utility_saved_hex: 95
    # ,
    #     fast_game: !params[:game_speed]
    )

    if (current_user.active_matches(current_user).length <= 9) || (current_user.account_type == 'premium')
      if params[:opponent][:which_user] == 'Random User'
        @match.away_user_id = random_active_user
        @match.save
        redirect_to match_path(@match)
      else
        @opponent = User.find_by_username(params[:opponent][:username])
        if @opponent == nil
          flash[:cant_find_username] = "No such Username"
          redirect_to :back
        else
          if @opponent.id == current_user.id
            flash[:cant_find_username] = "You cannot play yourself"
            redirect_to :back
          else
            if @opponent.id <= 10
              @match.match_against = 'computer'
              @match.away_ready = true
              @match.match_status = 'new'
              redirect_to :back
            else
              @match.away_user_id = @opponent.id
              @match.save
              redirect_to match_path(@match)
            end
          end
        end
      end
    else
      flash[:cant_find_username] = "You have reached max games"
      flash[:error] = "You may only have 10 active games with a basic account."
      redirect_to :back
    end
  end

  def game_accepted
    @match = Match.find(params[:id])
    if @match[:match_status] == 'pending'
      @match.update(
          match_status: 'new'
      )
    end
  end

  def start_game
    @match = Match.find(params[:match_id])
    if @match[:match_status] == 'new'
      Keen.publish(:new_games, {home_user: @match.home_user_id, away_user: @match.away_user_id}) if Rails.env.production?
      @match.update(
          who_started: params[:who_started],
          whos_turn: params[:who_started],
          match_status: 'in progress'
      )
    end
    render nothing: true
  end

  def position_of_kings(match_id)
    @match = Match.find(match_id)
    new_home = @match.home_units_position.split('|').map { |s| s.split(':') }
    new_away = @match.away_units_position.split('|').map { |s| s.split(':') }
    home_king = new_home.select { |unit| unit[0].to_i == 17 }
    away_king = new_away.select { |unit| unit[0].to_i == 17 }
    return [home_king, away_king]
  end

  def finish_game
    p 'finish game 1' * 80
    @match = Match.find(params[:match_id])
    p @match

    kings = position_of_kings(params[:match_id])
    kings.map! do |king|
      (king[0][1][0] == 'g')
    end
    p @match[:match_status]
    p kings.include? true
    p kings
    p
    p 'finish game 2' * 80
    if ((@match[:match_status] == 'in progress') && (kings.include? true))
      p 'finish game 3' * 80
      @match.update(match_status: 'finished')
      if params[:winner] == '1'
        winner = User.find(@match.home_user_id)
        loser = User.find(@match.away_user_id)
      else
        winner = User.find(@match.away_user_id)
        loser = User.find(@match.home_user_id)
      end
      p 'finish game 4' * 80
      Keen.publish(:finish_games, {winner: winner.id, loser: loser.id, turn: @match.turn}) if Rails.env.production?
      if (@match[:match_against] == 'human')
        winner.update(wins: (winner.wins + 1))
        loser.update(losses: (loser.losses + 1))
      end
    end
    render nothing: true
  end

  def update_match_info()
    @match = Match.find(params[:match_id])

    new_home = params[:home_units].split('|').map { |s| s.split(':') }
    new_away = params[:away_units].split('|').map { |s| s.split(':') }
    old_home = @match.home_units_position.split('|').map { |s| s.split(':') }
    old_away = @match.away_units_position.split('|').map { |s| s.split(':') }

    home_king = new_home.select { |unit| unit[0].to_i == 17 }
    away_king = new_away.select { |unit| unit[0].to_i == 17 }

    away_captures = new_away.select { |unit| unit[1] == 'g0' }
    away_on_board = new_away.select { |unit| (unit[1].to_i > 0) && (unit[1].to_i <= 91) }
    away_loading = new_away.select { |unit| unit[1] == 'lDock' }
    home_captures = new_home.select { |unit| unit[1] == 'g1' }
    home_on_board = new_home.select { |unit| (unit[1].to_i > 0) && (unit[1].to_i <= 91) }
    home_loading = new_home.select { |unit| unit[1] == 'lDock' }

    units_in_validate_place = home_captures.length + home_on_board.length + home_loading.length + away_captures.length + away_on_board.length + away_loading.length

    new_home_captures = new_home.select { |unit| unit[1] == 'g1' }
    new_away_captures = new_away.select { |unit| unit[1] == 'g0' }
    old_home_captures = old_home.select { |unit| unit[1] == 'g1' }
    old_away_captures = old_away.select { |unit| unit[1] == 'g0' }

    captures_this_turn = (new_away_captures.length - old_away_captures.length) + (new_home_captures.length - old_home_captures.length)

    if (((@match.turn + 1) == params[:turn].to_i) || (home_king[0][1] == 'g1') || (away_king[0][1] == 'g0')) && (units_in_validate_place == 38) && (captures_this_turn <= 2)
      @match.update(
          turn: params[:turn],
          time_of_last_move: Time.now.utc,
          whos_turn: params[:whos_turn],
          home_units_position: params[:home_units],
          away_units_position: params[:away_units],
          last_move: params[:last_move],
          utility_saved_hex: 95
      )
    end
    render nothing: true
  end

  def cavalry_first_jump
    @match = Match.find(params[:match_id])
    @match.update(utility_saved_hex: params[:cavalry_first_jump])
    render nothing: true
  end

  def update_home_units_position
    @match = Match.find(params[:match_id])
    if (@match.match_status == 'new') || (@match.match_status == 'pending')
      @match.update(home_units_position: params[:home_units])
    end
    render nothing: true
  end

  def update_away_units_position
    @match = Match.find(params[:match_id])
    if (@match.match_status == 'new') || (@match.match_status == 'pending')
      @match.update(away_units_position: params[:away_units])
    end
    render nothing: true
  end

  def home_user_ready
    @match = Match.find(params[:match_id])
    @match.update(home_ready: true)
  end

  def away_user_ready
    @match = Match.find(params[:match_id])
    @match.update(away_ready: true)
  end

  # DELETE /matches/1
  # DELETE /matches/1.json
  def game_declined
    @match = Match.find(params[:match_id])
    if (@match.match_status == 'new') || (@match.match_status == 'pending')
      @match.destroy
      flash[:error] = "Invitation Declined"
    end
    redirect_to :back
  end

  # PATCH/PUT /matches/1
  # PATCH/PUT /matches/1.json
  def update
    respond_to do |format|
      if @match.update(match_params)
        format.html { redirect_to @match, notice: 'Match was successfully updated.' }
        format.json { render :show, status: :ok, location: @match }
      else
        format.html { render :edit }
        format.json { render json: @match.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    current_user.resign(current_user, @match)
    flash[:error] = "Game Quit"

    @match.destroy
    respond_to do |format|
      format.html { redirect_to root_path, notice: 'Match was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_match
    @match = Match.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def match_params
    params.require(:match).permit(:match_against)
  end
end
