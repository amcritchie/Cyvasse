class King < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "King",
        :codename => "king",
        :movement => 1,
        :strength => 1,
        :changeClassOfHexagonInRange => 0,
        :flank => 0,
        :trump => nil,
    }
  end

end