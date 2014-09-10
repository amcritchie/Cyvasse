class HeavyHorse < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Heavy_Horse",
        :codename => "heavy_horse",
        :movement => 3,
        :strength => 3,
        :range => 0,
        :flank => 2,
        :trump => nil
    }
  end

end