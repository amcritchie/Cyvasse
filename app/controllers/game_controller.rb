class GameController < ApplicationController

  def piece_attributes
    @vangaurd = [Rabble.attributes, Spearman.attributes, Elephant.attributes]

    respond_to do |format|
      format.json { render json: @vangaurd}
    end
  end

end