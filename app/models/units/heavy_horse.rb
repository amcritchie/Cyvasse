class HeavyHorse < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Heavy Horse",
        :codename => "heavyhorse",
        :image => "svgs/heavyhorse.svg",
        :movement => '2 + 2',
        :strength => 3,
        :range => 0,
        :flank => 2,
        :trump => nil
    }
  end

end