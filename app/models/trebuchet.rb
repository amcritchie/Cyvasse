class Trebuchet < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Trebuchet",
        :codename => "trebuchet",
        :image => "svgs/trebuchet.svg",
        :movement => 1,
        :strength => 4,
        :range => 4,
        :flank => 0,
        :trump => ["Dragon"]
    }
  end

end