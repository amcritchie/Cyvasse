class Catapult < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Catapult",
        :codename => "catapult",
        :image => "svgs/catapult.svg",
        :movement => 2,
        :strength => 4,
        :range => 3,
        :flank => 0,
        :trump => nil
    }
  end

end