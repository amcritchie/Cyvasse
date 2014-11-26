class RemoveTurnColumnFromWorldStatuses < ActiveRecord::Migration
  def change
    remove_column :world_statuses, :turn
  end
end
