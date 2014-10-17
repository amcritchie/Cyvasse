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


    team1 = 1
    team0 = 0

    @index = 0

    @blahblah = Rabble.image_svg(1,2,3,4,5)

    def create_unit_set(unit_instructions_array, team)
      @array = Array.new
      unit_instructions_array.each do |type_of_unit|
        create_quantity_of_unit((type_of_unit[1]-1), type_of_unit[0], team)
      end
      @array
    end

    def create_quantity_of_unit(quantity_of_unit, class_name, team)
      (0..quantity_of_unit).each do |t|
        @array << create_unit(class_name, team)
      end
    end

    def create_unit(class_name, team, x_pos = -5, y_pos = -5)
      klass = class_name.split.inject(Object) { |o, c| o.const_get c }
      @index += 1
      klass.image_svg(team, @index, x_pos, y_pos)
    end

    def top_starting_positions
      array = []
      (1..5).each do |row, index|
        (1..(5 + row)).each do |column, col|
          array.push([column, row])
        end
      end
      array
    end
    def bottom_starting_positions
      array = []
      (7..11).each do |row, index|
        (1..(17 - row)).each do |column, col|
          array.push([column, row])
        end
      end
      array
    end

    def set_of_units(team, top = true)
      if top
        array_of_initial_spaces = top_starting_positions
      else
        array_of_initial_spaces = bottom_starting_positions
      end

      enemies = [create_vangaurd(team, array_of_initial_spaces.shuffle!.pop(7)),
                 create_cavalry(team, array_of_initial_spaces.shuffle!.pop(4)),
                 create_range(team, array_of_initial_spaces.shuffle!.pop(5)),
                 create_unique(team, array_of_initial_spaces.shuffle!.pop(4))]
    end

    def create_vangaurd(team, positions)
      array = []
      array.push(create_unit('Rabble', team, positions[0][0], positions[0][1]))
      array.push(create_unit('Rabble', team, positions[1][0], positions[1][1]))
      array.push(create_unit('Rabble', team, positions[2][0], positions[2][1]))
      array.push(create_unit('Spearman', team, positions[3][0], positions[3][1]))
      array.push(create_unit('Spearman', team, positions[4][0], positions[4][1]))
      array.push(create_unit('Elephant', team, positions[5][0], positions[5][1]))
      array.push(create_unit('Elephant', team, positions[6][0], positions[6][1]))
      array
    end

    def create_cavalry(team, positions)
      array = []
      array.push(create_unit('LightHorse', team, positions[0][0], positions[0][1]))
      array.push(create_unit('LightHorse', team, positions[1][0], positions[1][1]))
      array.push(create_unit('HeavyHorse', team, positions[2][0], positions[2][1]))
      array.push(create_unit('HeavyHorse', team, positions[3][0], positions[3][1]))
      array
    end

    def create_range(team, positions)
      array = []
      array.push(create_unit('Crossbowman', team, positions[0][0], positions[0][1]))
      array.push(create_unit('Crossbowman', team, positions[1][0], positions[1][1]))
      array.push(create_unit('Catapult', team, positions[2][0], positions[2][1]))
      array.push(create_unit('Catapult', team, positions[3][0], positions[3][1]))
      array.push(create_unit('Trebuchet', team, positions[4][0], positions[4][1]))
      array
    end

    def create_unique(team, positions)
      array = []
      array.push(create_unit('King', team, positions[0][0], positions[0][1]))
      array.push(create_unit('Dragon', team, positions[1][0], positions[1][1]))
      array.push(create_unit('Mountain', team, positions[2][0], positions[2][1]))
      array.push(create_unit('Mountain', team, positions[3][0], positions[3][1]))
      array
    end

    # light_units = create_unit_set([['Rabble', 3]], 1)
    # more_units = light_units.concat(create_unit_set([['LightHorse', 1], ['HeavyHorse', 1]], 0))

    # vangaurd = create_unit_set([['Rabble', 3], ['Spearman', 2], ['Elephant', 2]], 1)
    # cavalry = create_unit_set([['LightHorse', 2], ['HeavyHorse', 2]], 1)
    # range = create_unit_set([['Crossbowman', 2], ['Catapult', 2], ['Trebuchet', 1]], 1)
    # unique = create_unit_set([['King', 1], ['Dragon', 1], ['Mountain', 2]], 1)
    #
    # xvangaurd = create_unit_set([['Rabble', 3], ['Spearman', 2], ['Elephant', 2]], 0)
    # xcavalry = create_unit_set([['LightHorse', 2], ['HeavyHorse', 2]], 0)
    # xrange = create_unit_set([['Crossbowman', 2], ['Catapult', 2], ['Trebuchet', 1]], 0)
    # xunique = create_unit_set([['King', 1], ['Dragon', 1], ['Mountain', 2]], 0)

    @enemies = set_of_units(0)
    @units = set_of_units(1, false)

    # @units = [create_vangaurd(1, Array.new(7, Array.new(2, -5))),
    #           create_cavalry(1, Array.new(7, Array.new(2, -5))),
    #           create_range(1, Array.new(7, Array.new(2, -5))),
    #           create_unique(1, Array.new(7, Array.new(2, -5))),
    # ]


    @map = [Array.new(6), Array.new(7), Array.new(8), Array.new(9),
            Array.new(10), Array.new(11), Array.new(10),
            Array.new(9), Array.new(8), Array.new(7), Array.new(6)]

    x_pos = 0
    y_pos = 1

    @map.each do |row|
      row.map! do |column|
        x_pos += 1

        if y_pos < 7
          hex_class = 'unSelected'
        else
          hex_class = 'selectedRange'
        end

        Hexagon.hexagon(x_pos, y_pos, hex_class)
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
