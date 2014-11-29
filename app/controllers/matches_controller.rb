class MatchesController < ApplicationController
  before_action :set_match, only: [:show, :edit, :update, :destroy]

  # GET /matches
  # GET /matches.json
  def index
    @matches = Match.all
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
        home_user_id: current_user.id,
        away_user_id: 2,
        home_ready: false,
        away_ready: true,
        match_status: 'new',
        match_against: 'computer',
        turn: 0
    )

    @match.save
    redirect_to match_path(@match)
  end

  def create_match_vs_player
    @match = Match.new(
        home_user_id: current_user.id,
        away_user_id: 1,
        home_ready: false,
        away_ready: false,
        match_status: 'pending',
        match_against: 'human',
        turn: 0
    )

    @match.save
    redirect_to match_path(@match)
  end

  def start_game
    @match = Match.find(params[:match_id])
    @match.update(
        who_started: params[:who_started],
        whos_turn: params[:who_started],
        match_status: 'in progress'
    )
  end

  def update_match_info
    @match = Match.find(params[:match_id])
    @match.update(
        turn: params[:turn],
        whos_turn: params[:whos_turn],
        home_units_position: params[:home_units],
        away_units_position: params[:away_units]
    )
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
  def destroy
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
    p '+=+'*100
    p params
    params.require(:match).permit(:match_against)
  end
end
