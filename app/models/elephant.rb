class Elephant < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Elephant",
        :codename => "elephant",
        :movement => 3,
        :strength => 4,
        :changeClassOfHexagonInRange => 0,
        :flank => 1,
        :trump => nil
    }
  end

end