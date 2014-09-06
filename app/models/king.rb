class King < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "King",
        :codename => "king",
        :movement => 1,
        :strength => 1,
        :flank => 0,
        :trump => nil,
        :team => 1
    }
  end

end