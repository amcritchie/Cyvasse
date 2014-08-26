class Mountain < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Mountain",
        :movement => 0,
        :strength => "Impassable, to non-dragons.",
        :flank => "--",
        :trump => nil
    }
  end

end