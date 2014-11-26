class RemoveFirstNameColumnFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :first_name
  end
end
