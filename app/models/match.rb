class Match < ActiveRecord::Base
  belongs_to :user
  has_one :game_status
end
