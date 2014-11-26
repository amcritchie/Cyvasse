class RemoveWorldStatusFromMatches < ActiveRecord::Migration
  def change
    remove_column :matches, :world_status_id
  end
end
