class JsonController < ApplicationController
  def piece_name
    @vangaurd = Rabble.attributes
    @blah = "rabble"

    respond_to do |format|
      format.json { render json: @vangaurd}
    end
  end
end