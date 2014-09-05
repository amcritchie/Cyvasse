class HeavyHorse < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Heavy Horse",
        :codename => "heavy horse",
        :movement => 3,
        :strength => 3,
        :flank => 2,
        :trump => nil
    }
  end

end