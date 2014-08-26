class Elephant < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Elephant",
        :movement => 3,
        :strength => 4,
        :flank => 1,
        :trump => nil
    }
  end

end