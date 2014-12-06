class Mountain < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Mountain",
        :codename => "mountain",
        :image => "svgs/mountain.svg",

        :movement => 'Immovable',
        :strength => 'Impassable',
        :range => 0,
        :flank => 0,
        :trump => nil
    }
  end

end