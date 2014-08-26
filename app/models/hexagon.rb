class Hexagon < ActiveRecord::Base

  def initialize(x_coordinate, y_coordinate)
    @x_pos = x_coordinate
    @y_pos = y_coordinate
  end

  def self.hexagon
    #Hexagon-triangle dimensions
    height = 30
    width = 52
    hypotenuse = 60
    hex_scale = 5.35

    hexagon = "<polygon points='#{width*hex_scale},0 0,#{height*hex_scale}
                                0,#{(height+hypotenuse)*hex_scale}
                                #{width*hex_scale},#{(hypotenuse*2)*hex_scale}
                                #{(width*2)*hex_scale},#{(height+hypotenuse)*hex_scale}
                                #{(width*2)*hex_scale},#{(height)*hex_scale}'/>"
  end

  def self.snowman
    "<g class='snowman'>
     <circle cx='30' cy='20' r='5' fill='white'></circle>
     <circle cx='30' cy='30' r='8' fill='white'></circle>
     <circle cx='30' cy='43' r='12' fill='white'></circle>
     <circle cx='28' cy='19' r='1' fill='black'></circle>
     <circle cx='32' cy='19' r='1' fill='black'></circle></g>"
  end

  def self.svg_compile(polygon, occupying_piece = '')
    svg = "<svg class='brick'>#{polygon} #{occupying_piece}</svg>"
  end

  def self.complete
    svg_compile(hexagon)
  end

end
