class Catapult < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Catapult",
        :codename => "catapult",
        :movement => 2,
        :strength => 3,
        :range => 2,
        :trump => nil
    }
  end

end