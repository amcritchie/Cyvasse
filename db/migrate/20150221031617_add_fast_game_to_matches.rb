class AddFastGameToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :fast_game, :boolean
  end
end
