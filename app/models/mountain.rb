class Mountain < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Mountain",
        :codename => "mountain",
        :movement => 0,
        :strength => 10,
        :range => 0,
        :flank => 0,
        :trump => nil
    }
  end

end