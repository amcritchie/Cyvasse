class Rabble < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Rabble",
        :codename => "rabble",
        :image => "svgs/rabble.svg",
        :movement => 3,
        :strength => 1,
        :range => 0,
        :flank => 1,
        :trump => nil
    }
  end
end