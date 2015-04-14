class Trebuchet < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Trebuchet",
        :codename => "trebuchet",
        :image => "svgs/trebuchet.svg",
        :movement => 0,
        :strength => 1,
        :range => 3,
        :flank => 0,
        :trump => ["Dragon"]
    }
  end

end