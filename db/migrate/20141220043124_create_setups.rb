class CreateSetups < ActiveRecord::Migration
  def change
    create_table :setups do |t|
      t.integer :user_id
      t.string :name
      t.string :units_position
      t.integer :button_position

      t.timestamps
    end
  end
end
