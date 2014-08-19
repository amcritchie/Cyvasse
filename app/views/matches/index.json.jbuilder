json.array!(@matches) do |match|
  json.extract! match, :id, :game_status_id, :user_id, :challenger_id
  json.url match_url(match, format: :json)
end
