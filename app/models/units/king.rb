class King < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "King",
        :codename => "king",
        :image => "svgs/king.svg",

        :movement => 1,
        :strength => 1,
        :range => 0,
        :flank => 0,
        :trump => nil,
    }
  end

end