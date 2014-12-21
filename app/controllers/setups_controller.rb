class SetupsController < ApplicationController

  def create

    if params[:id] != ''
      @setup = Setup.find(params[:id].to_i)
      @setup.destroy
    end

    @setup = Setup.create(
      user_id: current_user.id,
      name: params[:name],
      units_position: params[:units_position],
      button_position: params[:button_position]
    )
    redirect :back

  end

  def change_name
    @setup = Setup.find(params[:id].to_i)
    @setup.update(
        name: params[:name]
    )
    redirect :back
  end
end