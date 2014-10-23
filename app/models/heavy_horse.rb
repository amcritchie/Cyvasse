class HeavyHorse < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Heavy Horse",
        :codename => "heavy horse",
        :image => "svgs/heavyhorse.svg",
        :movement => 3,
        :strength => 3,
        :range => 0,
        :flank => 2,
        :trump => nil
    }
  end

end