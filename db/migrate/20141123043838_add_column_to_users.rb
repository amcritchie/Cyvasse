class AddColumnToUsers < ActiveRecord::Migration
  def change
    add_column :users, :email_confirmed, :boolean
    add_column :users, :account_type, :string
  end
end
