json.array!(@game_statuses) do |game_status|
  json.extract! game_status, :id, :p1_piece_loc, :p2_piece_loc, :turn, :status
  json.url game_status_url(game_status, format: :json)
end
