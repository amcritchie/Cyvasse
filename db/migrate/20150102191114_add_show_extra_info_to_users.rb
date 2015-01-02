class AddShowExtraInfoToUsers < ActiveRecord::Migration
  def change
    add_column :users, :show_extra_info, :boolean
  end
end
