class LightHorse < Unit

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Light Horse",
        :codename => "lighthorse",
        :image => "svgs/lighthorse.svg",
        :movement => '3 + 2',
        :strength => 2,
        :range => 0,
        :flank => 2,
        :trump => nil
    }
  end

end