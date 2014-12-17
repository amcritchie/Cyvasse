class AddLastMoveColumnToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :last_move, :string
  end
end
