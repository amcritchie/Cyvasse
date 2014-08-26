class Trebuchet < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Trebuchet",
        :movement => 1,
        :strength => 4,
        :range => 3,
        :trump => ["Dragon"]
    }
  end

end