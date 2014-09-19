class Trebuchet < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Trebuchet",
        :codename => "trebuchet",
        :movement => 1,
        :strength => 4,
        :changeClassOfHexagonInRange => 3,
        :flank => 0,
        :trump => ["Dragon"]
    }
  end

end