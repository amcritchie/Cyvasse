class CreateWorldStatuses < ActiveRecord::Migration
  def change
    create_table :world_statuses do |t|
      t.integer :match_id
      t.string :home_units_position
      t.string :away_units_position

      t.timestamps
    end
  end
end
