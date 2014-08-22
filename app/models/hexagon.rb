class Hexagon < ActiveRecord::Base

  def self.hex_html

    #Hexagon-triangle dimensions
    height = 30
    width = 52
    hypotenuse = 60
    hex_scale = 5.35

    green_hex = "<svg> <polygon points='
    #{width*hex_scale},0
    0,#{height*hex_scale}
    0,#{(height+hypotenuse)*hex_scale}
    #{width*hex_scale},#{(hypotenuse*2)*hex_scale}
    #{(width*2)*hex_scale},#{(height+hypotenuse)*hex_scale}
    #{(width*2)*hex_scale},#{(height)*hex_scale}'
    /> </svg>"

  end

  def initialize(x_coordinate,y_coordinate)
    @x_pos = x_coordinate
    @y_pos = y_coordinate
  end

  def self.hexagon
    hex_html
  end

end