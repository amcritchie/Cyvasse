class Match < ActiveRecord::Base
  belongs_to :user
  has_many :world_statuses

  # validates :match_against, presence: true
  # validates_presence_of :match_against

  def initialize(*args)
    super
    # hash = {}
  end
end
