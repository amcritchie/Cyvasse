class AddReadyColumnToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :home_ready, :boolean
    add_column :matches, :away_ready, :boolean
  end
end
