class AddTimeOfLastMoveToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :time_of_last_move, :datetime
  end
end
