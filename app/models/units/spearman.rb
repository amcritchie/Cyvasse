class Spearman < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Spearman",
        :codename => "spearman",
        :image => "svgs/spearman.svg",
        :movement => 2,
        :strength => 2,
        :range => 0,
        :flank => 2,
        :trump => ["Light Horse"]
    }
  end
end