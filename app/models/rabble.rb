class Rabble < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Rabble",
        :movement => 2,
        :strength => 1,
        :flank => 1,
        :trump => nil
    }
  end

  def self.image
    image = "<svg id='snowman' class='unit' data-team='1' data-codename='rabble'
    data-codename='elephant' data-englishname=#{attributes[:name]}
    data-movement=#{attributes[:movement]} data-flank=#{attributes[:flank]}
    data-strength=#{attributes[:strength]} data-trump=#{attributes[:trump]}>>
    <circle cx='30' cy='20' r='5' fill='white'></circle>
    <circle cx='30' cy='30' r='8' fill='white'></circle>
    <circle cx='30' cy='43' r='12' fill='white'></circle>
    <circle cx='28' cy='19' r='1' fill='black'></circle>
    <circle cx='32' cy='19' r='1' fill='black'></circle></svg>"
  end

end