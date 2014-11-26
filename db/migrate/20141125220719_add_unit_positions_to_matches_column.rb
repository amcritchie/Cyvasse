class AddUnitPositionsToMatchesColumn < ActiveRecord::Migration
  def change
    add_column :matches, :home_units_position, :string
    add_column :matches, :away_units_position, :string
  end
end
