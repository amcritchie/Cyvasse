class Match < ActiveRecord::Base
  belongs_to :user

  def initialize(*args)
    super
    # hash = {}
  end
end
