class GameStatusesController < ApplicationController
  before_action :set_game_status, only: [:show, :edit, :update, :destroy]

  # GET /game_statuses
  # GET /game_statuses.json
  def index
    @game_statuses = GameStatus.all
  end

  # GET /game_statuses/1
  # GET /game_statuses/1.json
  def show
  end

  # GET /game_statuses/new
  def new
    @game_status = GameStatus.new
  end

  # GET /game_statuses/1/edit
  def edit
  end

  # POST /game_statuses
  # POST /game_statuses.json
  def create
    @game_status = GameStatus.new(game_status_params)

    respond_to do |format|
      if @game_status.save
        format.html { redirect_to @game_status, notice: 'Game status was successfully created.' }
        format.json { render :show, status: :created, location: @game_status }
      else
        format.html { render :new }
        format.json { render json: @game_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /game_statuses/1
  # PATCH/PUT /game_statuses/1.json
  def update
    respond_to do |format|
      if @game_status.update(game_status_params)
        format.html { redirect_to @game_status, notice: 'Game status was successfully updated.' }
        format.json { render :show, status: :ok, location: @game_status }
      else
        format.html { render :edit }
        format.json { render json: @game_status.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /game_statuses/1
  # DELETE /game_statuses/1.json
  def destroy
    @game_status.destroy
    respond_to do |format|
      format.html { redirect_to game_statuses_url, notice: 'Game status was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_game_status
      @game_status = GameStatus.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def game_status_params
      params.require(:game_status).permit(:p1_piece_loc, :p2_piece_loc, :turn, :status)
    end
end
