class RemoveWorldStatusTable < ActiveRecord::Migration
  def change
    drop_table :world_statuses
  end
end
