class AddMatchAgainstColumnToMatch < ActiveRecord::Migration
  def change
    add_column :matches, :match_against, :string
  end
end
