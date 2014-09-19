class Rabble < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Rabble",
        :codename => "rabble",
        :movement => 2,
        :strength => 1,
        :changeClassOfHexagonInRange => 0,
        :flank => 1,
        :trump => nil
    }
  end
end