class Catapult < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Catapult",
        :codename => "catapult",
        :movement => 2,
        :strength => 3,
        :changeClassOfHexagonInRange => 3,
        :flank => 0,
        :trump => nil
    }
  end

end