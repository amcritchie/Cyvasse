class King < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "King",
        :movement => 1,
        :strength => 1,
        :flank => "--",
        :trump => nil
    }
  end

end