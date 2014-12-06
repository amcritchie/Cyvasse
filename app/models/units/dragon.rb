class Dragon < Unit
  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Dragon",
        :codename => "dragon",
        :image => "svgs/dragon.svg",
        :movement => 'Any distance in a line',
        :strength => 5,
        :range => 0,
        :flank => 0,
        :trump => nil
    }
  end

end