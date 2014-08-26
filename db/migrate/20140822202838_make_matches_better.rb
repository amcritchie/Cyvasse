class MakeMatchesBetter < ActiveRecord::Migration
  def change
    drop_table :game_statuses
    add_column :matches, :match_state, :text
  end
end
