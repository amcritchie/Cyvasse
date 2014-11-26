class Mountain < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Mountain",
        :codename => "mountain",
        :image => "svgs/mountain.svg",

        :movement => 0,
        :strength => 9,
        :range => 0,
        :flank => 0,
        :trump => nil
    }
  end

end