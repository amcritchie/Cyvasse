class AddUnitOutlinesToUsers < ActiveRecord::Migration
  def change
    add_column :users, :unit_outlines, :boolean
  end
end
