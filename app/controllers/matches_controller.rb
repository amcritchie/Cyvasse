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

    @rabble = Rabble.image(5,8)
    @spearman = Spearman.image(5,4)
    @elephant = Elephant.image(4,6)
    @vangaurd = [Rabble.attributes, Spearman.attributes, Elephant.attributes]

    @map = [Array.new(6),Array.new(7),Array.new(8),Array.new(9),
            Array.new(10),Array.new(11),Array.new(10),
            Array.new(9),Array.new(8),Array.new(7),Array.new(6)]

    x_pos = 0
    y_pos = 1

    @map.each do |row|
      row.map! do |column|
        x_pos += 1
        Hexagon.hexagon(x_pos,y_pos)
      end
      x_pos = 0
      y_pos += 1
    end

  end

  # GET /matches/new
  def new
    @match = Match.new
  end

  # GET /matches/1/edit
  def edit
  end

  # POST /matches
  # POST /matches.json
  def create
    @match = Match.new(match_params)


    respond_to do |format|
      if @match.save

        format.html { redirect_to @match, notice: 'Match was successfully created.' }
        format.json { render :show, status: :created, location: @match }
      else
        format.html { render :new }
        format.json { render json: @match.errors, status: :unprocessable_entity }
      end
    end
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
      format.html { redirect_to matches_url, notice: 'Match was successfully destroyed.' }
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
      params.require(:match).permit(:game_status_id, :user_id, :challenger_id)
    end
end
