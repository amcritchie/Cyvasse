class Crossbowman < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Crossbowman",
        :codename => "crossbowman",
        :image => "svgs/crossbowman.svg",
        :movement => 1,
        :strength => 2,
        :flank => 0,
        :range => 2,
        :trump => nil
    }
  end

end