class MatchesController < ApplicationController
  before_action :set_match, only: [:show, :edit, :update, :destroy]

  # GET /matches
  # GET /matches.json
  def index
    @matches = Match.all
  end

  def finished_games
    @matches = current_user.finished_matches(session[:user_id]).reverse
  end


  # GET /matches/1
  # GET /matches/1.json
  def show

  end

  # GET /matches/new
  def new
    @match = Match.new
    @challengers = User.where.not(id: current_user)
  end

  # GET /matches/1/edit
  def edit
  end

  # POST /matches
  # POST /matches.json
  def create
    @match = Match.new(match_params)

    @match.home_user_id = current_user.id
    @match.turn = 0
    if params[:match][:match_against] == 'computer'
      @match.away_user_id = 2
      @match.match_status = 'new'
    else
      @match.away_user_id = User.last.id
      @match.match_status = 'pending'
    end

    if @match.save
      redirect_to :root
    else
      render :new
    end
  end


  def create_match_vs_computer
    @match = Match.new(
        time_of_last_move: Time.now.utc,
        home_user_id: current_user.id,
        away_user_id: 2,
        home_ready: false,
        away_ready: true,
        match_status: 'new',
        match_against: 'computer',
        turn: 0,
        utility_saved_hex: 95
    )

    if (current_user.active_matches(current_user).length <= 4) || (current_user.account_type == 'premium')
      @match.save
      redirect_to match_path(@match)
    else
      flash[:cant_find_username] = "You have reached max games"
      flash[:error] = "You may only have 5 active games with a basic account."
      redirect_to :back
    end
  end

  def game_accepted
    @match = Match.find(params[:id])
    @match.update(
        match_status: 'new'
    )
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
    )

    if (current_user.active_matches(current_user).length <= 4) || (current_user.account_type == 'premium')
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
            if @opponent.id == 2
              @match.match_against = 'computer'
              @match.away_ready = true
              @match.match_status = 'new'
            end
            @match.away_user_id = @opponent.id
            @match.save
            redirect_to match_path(@match)
          end
        end
      end
    else
      flash[:cant_find_username] = "You have reached max games"
      flash[:error] = "You may only have 5 active games with a basic account."
      redirect_to :back
    end
  end

  def start_game
    @match = Match.find(params[:match_id])
    Keen.publish(:new_games, {home_user: @match.home_user_id, away_user: @match.away_user_id }) if Rails.env.production?
    @match.update(
        who_started: params[:who_started],
        whos_turn: params[:who_started],
        match_status: 'in progress'
    )
    render nothing: true
  end

  def finish_game
    @match = Match.find(params[:match_id])
    @match.update(match_status: 'finished')

    if params[:winner] == '1'
      winner = User.find(@match.home_user_id)
      loser = User.find(@match.away_user_id)
    else
      winner = User.find(@match.away_user_id)
      loser = User.find(@match.home_user_id)
    end
    Keen.publish(:finish_games, {winner: winner.id, loser: loser.id, turn: @match.turn}) if Rails.env.production?

    winner.update(
        wins: (winner.wins + 1)
    )
    loser.update(
        losses: (loser.losses + 1)
    )
    render nothing: true
  end

  def update_match_info()
    @match = Match.find(params[:match_id])

    @match.update(
        turn: params[:turn],
        time_of_last_move: Time.now.utc,
        whos_turn: params[:whos_turn],
        home_units_position: params[:home_units],
        away_units_position: params[:away_units],
        last_move: params[:last_move],
        utility_saved_hex: 95
    )
    render nothing: true
  end

  def cavalry_first_jump
    @match = Match.find(params[:match_id])

    @match.update(
        utility_saved_hex: params[:cavalry_first_jump]
    )
    render nothing: true

  end

  def update_turn
    @match = Match.find(params[:match_id])
    @match.update(turn: params[:turn])
    render nothing: true
  end

  def update_home_units_position
    @match = Match.find(params[:match_id])
    @match.update(home_units_position: params[:home_units])
    render nothing: true
  end

  def update_away_units_position
    @match = Match.find(params[:match_id])
    @match.update(away_units_position: params[:away_units])
  end

  def home_user_ready
    @match = Match.find(params[:match_id])
    @match.update(
        home_ready: true
    )
  end

  def away_user_ready
    @match = Match.find(params[:match_id])
    @match.update(
        away_ready: true
    )
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

  # DELETE /matches/1
  # DELETE /matches/1.json
  def game_declined

    Match.find(params[:match_id]).destroy
    flash[:error] = "Invitation Declined"

    redirect_to :back
  end

  def destroy
    current_user.resign(current_user,@match)
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
