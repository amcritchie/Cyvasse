class Unit


  def self.image_png(team = 0, index = 1, x_pos = -5, y_pos = -5, row_size = 1)
    # team = 1

    if y_pos < 6
      row_size = y_pos + 5
    else
      row_size = 17 - y_pos
    end

    # image = "<img src='../assets/pieces/#{attributes[:codename]}.png'
    #   id='#{attributes[:codename]}' class='newUnit' data-team=#{team} data-index=#{index}
    #   data-inRange=#{false}
    #   data-x_pos=#{x_pos} data-y_pos=#{y_pos} data-row_size=#{row_size} data-alive='unplaced'
    #   data-codename='#{attributes[:codename]}' data-englishname=#{attributes[:name]}
    #   data-movement=#{attributes[:movement]} data-flank=#{attributes[:flank]}
    #   data-range=#{attributes[:range]}
    #   data-strength=#{attributes[:strength]} data-trump=#{attributes[:trump]}
    #   data-numericalStats=#{[attributes[:codename], attributes[:movement], attributes[:strength], attributes[:changeClassOfHexagonInRange], attributes[:flank]]}>"

    image = "<img src='../assets/pieces/#{attributes[:codename]}.png'
      id='#{attributes[:codename]}' class='newUnit' data-team=#{team} data-index=#{index}
      data-inRange=#{false}
      data-x_pos=#{x_pos} data-y_pos=#{y_pos} data-row_size=#{row_size} data-alive='unplaced'
      data-codename='#{attributes[:codename]}' data-englishname=#{attributes[:name]}
      data-movement=#{attributes[:movement]} data-flank=#{attributes[:flank]}
      data-range=#{attributes[:range]}
      data-strength=#{attributes[:strength]} data-trump=#{attributes[:trump]}
      data-numericalStats=#{[attributes[:codename], attributes[:movement], attributes[:strength], attributes[:strength], attributes[:flank]]}>"
  end

  def self.image_svg(team = 0, index = 1, x_pos = -5, y_pos = -5, row_size = 1)

    if y_pos < 6
      row_size = y_pos + 5
    else
      row_size = 17 - y_pos
    end

    svg = {:image => attributes[:image],
           :id => attributes[:codename],
           :class => 'newUnit',
           :data => {
               :team => team,
               :index => index,
               :inRange => false,
               :xPos => x_pos,
               :yPos => y_pos,
               :x_pos => x_pos,
               :y_pos => y_pos,
               :rowSize => row_size,
               :alive => 'unplaced',
               :codename => attributes[:codename],
               :englishName => attributes[:name],
               :movement => attributes[:movement],
               :flank => attributes[:flank],
               :range => attributes[:range],
               :strength => attributes[:strength],
               :trump => "vv"
           }
    }
  end

end