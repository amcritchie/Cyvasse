class Dragon < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Dragon",
        :movement => "Any distance in a line.",
        :strength => 5,
        :flank => "--",
        :trump => nil
    }
  end

end