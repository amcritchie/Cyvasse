class Elephant < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Elephant",
        :codename => "elephant",
        :movement => 3,
        :strength => 4,
        :range => 0,
        :flank => 1,
        :trump => nil
    }
  end

end