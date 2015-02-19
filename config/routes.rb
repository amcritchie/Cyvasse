Rails.application.routes.draw do

  root to: 'home#root'
  get '/about', to: 'home#about'
  get '/rules', to: 'home#rules'
  get '/contact', to: 'home#contact'

  get "admin/home" => "admin#home", as: :admin
  get "finished_games" => "matches#finished_games"

  get "login" => "sessions#new", as: :login
  post "login" => "sessions#create"
  delete "logout" => "sessions#destroy", as: :logout

  resources :users do
    resources :favorites, only: [:create, :destroy, :index]
    resources :messages, only: [:create, :destroy, :index]
    resources :setups, only: [:create, :destroy, :index]
  end

  post "toggle_outlines" => "users#toggle_outlines"
  post "extra_info_open" => "users#extra_info_open"
  post "extra_info_close" => "users#extra_info_close"
  post "update_last_active" => "users#update_last_active"

  post "change_setup_name" => "setups#change_name"

  # The get command is needed for when a new user is played.
  get "create_computer_match" => "matches#create_match_vs_computer"
  post "create_computer_match" => "matches#create_match_vs_computer"
  post "create_player_match" => "matches#create_match_vs_player"

  resources :matches do
    post "game_declined" => "matches#game_declined"
  end

  # Match Routes
  post "game_accepted" => "matches#game_accepted"
  put 'update_home_units_position' => 'matches#update_home_units_position'
  put 'update_away_units_position' => 'matches#update_away_units_position'
  put 'home_user_ready' => 'matches#home_user_ready'
  put 'away_user_ready' => 'matches#away_user_ready'
  put 'start_game' => 'matches#start_game'
  put 'update_match_info' => 'matches#update_match_info'
  put 'cavalry_first_jump' => 'matches#cavalry_first_jump'
  put 'finish_game' => 'matches#finish_game'

  get 'qwertyuiopasdfghjklzxcvbnm' => 'users#change_password'
end
