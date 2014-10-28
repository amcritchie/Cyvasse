class AddWorldStatusIdTurnAndWhoStartedToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :world_status_id, :integer
    add_column :matches, :turn, :integer
    add_column :matches, :who_started, :integer
    remove_column :matches, :game_status_id
    remove_column :matches, :match_state
  end
end
