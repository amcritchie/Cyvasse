class Crossbowman < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Crossbowman",
        :movement => 2,
        :strength => 2,
        :range => 2,
        :trump => nil
    }
  end

end