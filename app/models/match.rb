class Match < ActiveRecord::Base
  belongs_to :user
  has_many :world_statuses

  def initialize(*args)
    super
    # hash = {}
  end
end
