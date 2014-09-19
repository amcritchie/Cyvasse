class Spearman < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Spearman",
        :codename => "spearman",
        :movement => 2,
        :strength => 2,
        :changeClassOfHexagonInRange => 0,
        :flank => 2,
        :trump => ["Light Horse", "Heavy Horse"]
    }
  end
end