class AddWhosTurnColumnToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :whos_turn, :integer
  end
end
