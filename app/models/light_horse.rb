class LightHorse < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Light_Horse",
        :codename => "light_horse",
        :movement => 4,
        :strength => 2,
        :range => 0,
        :flank => 2,
        :trump => nil
    }
  end

end