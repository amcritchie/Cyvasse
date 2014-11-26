class RenameUserIdColumn < ActiveRecord::Migration
  def change
    rename_column :matches, :user_id, :home_user_id
    rename_column :matches, :challenger_id, :away_user_id
    add_column :matches, :match_status, :string
  end
end
