class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :message
      t.integer :sender
      t.integer :receiver
      t.integer :match
      t.boolean :read

      t.timestamps
    end
  end
end
