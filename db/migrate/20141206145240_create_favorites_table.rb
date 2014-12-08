class CreateFavoritesTable < ActiveRecord::Migration
  def change
    create_table :favorites do |t|
      t.integer :favoriter
      t.integer :favorited
    end
  end
end
