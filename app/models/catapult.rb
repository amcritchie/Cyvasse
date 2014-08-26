class Catapult < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Catapult",
        :movement => 2,
        :strength => 3,
        :range => 2,
        :trump => nil
    }
  end

end