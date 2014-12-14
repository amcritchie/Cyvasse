Rails.application.routes.draw do

  root to: 'home#root'

  resources :users do
    resources :favorites, only: [:create, :destroy, :index]
  end
  post "update_last_active" => "users#update_last_active"
  post "toggle_outlines" => "users#toggle_outlines"
  resources :matches
  resources :world_statuses

  get "login" => "sessions#new", as: :login
  post "login" => "sessions#create"
  delete "logout" => "sessions#destroy", as: :logout

  put 'start_game' => 'matches#start_game'
  put 'update_match_info' => 'matches#update_match_info'
  put 'update_home_units_position' => 'matches#update_home_units_position'
  put 'update_away_units_position' => 'matches#update_away_units_position'
  put 'home_user_ready' => 'matches#home_user_ready'
  put 'away_user_ready' => 'matches#away_user_ready'
  put 'finish_game' => 'matches#finish_game'

  post "create_computer_match" => "matches#create_match_vs_computer"
  get "create_computer_match" => "matches#create_match_vs_computer"

  post "create_player_match" => "matches#create_match_vs_player"

  resource :session, only: [:new, :create, :destroy]

  get '/about', to: 'home#about'
  get '/contact', to: 'home#contact'

  resources :game_statuses

  # get '/users', to: 'users#index'

  # The priority is based upon order of creation: features created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  # root 'welcome#index'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
