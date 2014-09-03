class Hexagon < ActiveRecord::Base

  def initialize(x_coordinate, y_coordinate)
    @x_pos = x_coordinate
    @y_pos = y_coordinate
  end

  def self.hexagon(x_pos,y_pos)
    #Hexagon-triangle dimensions
    height = 30
    width = 52
    hypotenuse = 60
    # hex_scale = 5.35
    hex_scale = 5.36


    if y_pos < 7
        size = y_pos + 5
      else
        size = 17 - y_pos
      end

    hexagon = "<svg class='brick'>
                    <polygon class='unSelected' data-x-pos=#{x_pos} data-y-pos=#{y_pos}
                    data-size=#{size} data-occupided=#{false} data-even=#{true}
                    points='#{width*hex_scale},0 0,#{height*hex_scale}
                    0,#{(height+hypotenuse)*hex_scale}
                    #{width*hex_scale},#{(hypotenuse*2)*hex_scale}
                    #{(width*2)*hex_scale},#{(height+hypotenuse)*hex_scale}
                    #{(width*2)*hex_scale},#{(height)*hex_scale}'/></svg>"
  end

end
