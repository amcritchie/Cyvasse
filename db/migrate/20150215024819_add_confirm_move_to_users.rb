class AddConfirmMoveToUsers < ActiveRecord::Migration
  def change
    add_column :users, :confirm_move, :boolean
  end
end
