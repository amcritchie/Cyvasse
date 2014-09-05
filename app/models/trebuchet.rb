class Trebuchet < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Trebuchet",
        :codename => "trebuchet",
        :movement => 1,
        :strength => 4,
        :range => 3,
        :trump => ["Dragon"]
    }
  end

end