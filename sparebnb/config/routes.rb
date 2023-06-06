Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: :create # add user
    resource :session, only: [:show, :create, :destroy] # get current_user, login, logout
    resources :listings, only: [:index, :show]
  end
end
