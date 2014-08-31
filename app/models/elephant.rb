class Elephant < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Elephant",
        :movement => 3,
        :strength => 4,
        :flank => 1,
        :trump => nil
    }
  end

  def self.image
    image = "<svg id='swampman' class='unit' data-team='1'
      data-codename='elephant' data-englishname=#{attributes[:name]}
      data-movement=#{attributes[:movement]} data-flank=#{attributes[:flank]}
      data-strength=#{attributes[:strength]} data-trump=#{attributes[:trump]}>
      <circle cx='30' cy='20' r='5' fill='green'></circle>
      <circle cx='30' cy='30' r='8' fill='green'></circle>
      <circle cx='30' cy='43' r='12' fill='green'></circle>
      <circle cx='28' cy='19' r='1' fill='black'></circle>
      <circle cx='32' cy='19' r='1' fill='black'></circle></svg>"
  end


end