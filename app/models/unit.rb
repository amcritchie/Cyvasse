class Unit


  def self.image_png(team = 0, index = 1, x_pos = -5, y_pos = -5, row_size = 1)
    # team = 1

    if y_pos < 6
      row_size = y_pos + 5
    else
      row_size = 17 - y_pos
    end

    image = "<img src='../assets/pieces/#{attributes[:codename]}.png'
      id='#{attributes[:codename]}' class='newUnit' data-team=#{team} data-index=#{index}
      data-inRange=#{false}
      data-x_pos=#{x_pos} data-y_pos=#{y_pos} data-row_size=#{row_size} data-alive='unplaced'
      data-codename='#{attributes[:codename]}' data-englishname=#{attributes[:name]}
      data-movement=#{attributes[:movement]} data-flank=#{attributes[:flank]}
      data-range=#{attributes[:range]}
      data-strength=#{attributes[:strength]} data-trump=#{attributes[:trump]}
      data-numericalStats=#{[attributes[:codename], attributes[:movement], attributes[:strength], attributes[:changeClassOfHexagonInRange], attributes[:flank]]}>"
  end

  # def self.image(x_pos = '', y_pos = '')
  #
  #   if y_pos < 7
  #     size = y_pos + 5
  #   else
  #     size = 17 - y_pos
  #   end
  #
  #   image = "<svg id='lavaman' class='unit' data-team='1' data-codename='spearman'
  #     data-x_pos=#{x_pos} data-y_pos=#{y_pos} data-row_size=#{size} data-alive='unplaced'
  #     data-codename='elephant' data-englishname=#{attributes[:name]}
  #     data-movement=#{attributes[:movement]} data-flank=#{attributes[:flank]}
  #     data-strength=#{attributes[:strength]} data-trump=#{attributes[:trump]}>>
  #     <circle cx='30' cy='20' r='5' fill='red'></circle>
  #     <circle cx='30' cy='30' r='8' fill='red'></circle>
  #     <circle cx='30' cy='43' r='12' fill='red'></circle>
  #     <circle cx='28' cy='19' r='1' fill='orange'></circle>
  #     <circle cx='32' cy='19' r='1' fill='orange'></circle></svg>"
  # end
end