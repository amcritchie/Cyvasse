class WorldStatusesController < ApplicationController

  def create
    @match = Match.find(params[:match_id])
    @match.update(
        turn: @match.turn + 1,
        home_units_position: params[:home_units],
        away_units_position: params[:away_units]
    )
    @world_status = WorldStatus.create(
        match_id: params[:match_id],
        home_units_position: params[:home_units],
        away_units_position: params[:away_units]
    )

  end

end