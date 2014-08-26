class Rabble < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Rabble",
        :movement => 2,
        :strength => 1,
        :flank => 1,
        :trump => nil
    }
  end

end