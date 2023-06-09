Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create, :show] do
      resources :listings, only: [:index]
      resources :reservations, only: [:index]
    end
    resource :session, only: [:show, :create, :destroy]
    resources :listings, only: [:index, :show] do
      resources :reservations, only: [:index, :create]
    end
    resources :reservations, only: [:index, :show, :update, :destroy]
  end
  
  get '*path', to: "static_pages#frontend_index"
end
