Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create # add user
    resource :session, only: [:show, :create, :destroy] # get current_user, login, logout
    resources :listings, only: [:index, :show]
  end
  
  # get 'api/listings', to: "api/listings#index", defaults: {format: :json}
  # get 'api/listings/:id', to: "api/listings#show", defaults: {format: :json}
  # get 'api/foo', to: "api/listings#foo", defaults: {format: :json}
  
  get '*path', to: "static_pages#frontend_index"
end
