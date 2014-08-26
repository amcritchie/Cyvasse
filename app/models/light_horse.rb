class LightHorse < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Light Horse",
        :movement => 4,
        :strength => 2,
        :flank => 2,
        :trump => nil
    }
  end

end