class LightHorse < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Light Horse",
        :codename => "light horse",
        :movement => 4,
        :strength => 2,
        :flank => 2,
        :trump => nil
    }
  end

end