class Spearman < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Spearman",
        :movement => 2,
        :strength => 2,
        :flank => 2,
        :trump => ["Light Horse", "Heavy Horse"]
    }
  end

  def self.image(x_pos = '', y_pos = '')

    if y_pos < 7
      size = y_pos + 5
    else
      size = 17 - y_pos
    end

    image = "<svg id='lavaman' class='unit' data-team='1' data-codename='spearman'
      data-x_pos=#{x_pos} data-y_pos=#{y_pos} data-row_size=#{size} data-alive='unplaced'
      data-codename='elephant' data-englishname=#{attributes[:name]}
      data-movement=#{attributes[:movement]} data-flank=#{attributes[:flank]}
      data-strength=#{attributes[:strength]} data-trump=#{attributes[:trump]}>>
      <circle cx='30' cy='20' r='5' fill='red'></circle>
      <circle cx='30' cy='30' r='8' fill='red'></circle>
      <circle cx='30' cy='43' r='12' fill='red'></circle>
      <circle cx='28' cy='19' r='1' fill='orange'></circle>
      <circle cx='32' cy='19' r='1' fill='orange'></circle></svg>"
  end

end