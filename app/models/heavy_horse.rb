class HeavyHorse < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Heavy Horse",
        :movement => 3,
        :strength => 3,
        :flank => 2,
        :trump => nil
    }
  end

end