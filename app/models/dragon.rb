class Dragon < Unit
  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Dragon",
        :codename => "dragon",
        :movement => 6,
        :strength => 5,
        :changeClassOfHexagonInRange => 0,
        :flank => 0,
        :trump => nil
    }
  end

end