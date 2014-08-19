class CreateGameStatuses < ActiveRecord::Migration
  def change
    create_table :game_statuses do |t|
      t.string :p1_piece_loc
      t.string :p2_piece_loc
      t.integer :turn
      t.string :status

      t.timestamps
    end
  end
end
