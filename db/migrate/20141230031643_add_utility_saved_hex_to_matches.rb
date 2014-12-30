class AddUtilitySavedHexToMatches < ActiveRecord::Migration
  def change
    add_column :matches, :utility_saved_hex, :string
  end
end
