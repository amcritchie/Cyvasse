class Hexagon < ActiveRecord::Base

  def initialize(x_coordinate, y_coordinate)
    @x_pos = x_coordinate
    @y_pos = y_coordinate
  end

  def self.hexagon(x_pos, y_pos, hex_class)
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
  <defs>
    <linearGradient id='grad1' x1='0%' y1='100%' x2='100%' y2='0%'>
      <stop offset='0%' style='stop-color:##1c6124;stop-opacity:1' />
      <stop offset='100%' style='stop-color:#1c2124;stop-opacity:1' />
    </linearGradient>
    <linearGradient id='grad2' x1='0%' y1='100%' x2='100%' y2='0%'>
      <stop offset='0%' style='stop-color:#1c6124;stop-opacity:1' />
      <stop offset='100%' style='stop-color:#1c2124;stop-opacity:1' />
    </linearGradient>
  </defs>
                    <polygon class=#{hex_class} data-x-pos=#{x_pos} data-y-pos=#{y_pos}
                    data-size=#{size} data-occupied=#{false} data-even=#{true}
                    points='#{width*hex_scale},0 0,#{height*hex_scale}
                    0,#{(height+hypotenuse)*hex_scale}
                    #{width*hex_scale},#{(hypotenuse*2)*hex_scale}
                    #{(width*2)*hex_scale},#{(height+hypotenuse)*hex_scale}
                    #{(width*2)*hex_scale},#{(height)*hex_scale}'/></svg>"
  end

end
