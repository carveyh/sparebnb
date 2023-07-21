Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"

  namespace :api, defaults: { format: :json } do
    resource :session, only: [:show, :create, :destroy]
    resources :users, only: [:create, :show] do
      resources :listings, only: [:index]
      resources :reservations, only: [:index]
      resources :reservation_reviews, only: [:index]
    end
    resources :listings, only: [:index, :show] do
      resources :reservations, only: [:index, :create]
      resources :reservation_reviews, only: [:index]
    end
    resources :reservations, only: [:index, :show, :update, :destroy] do
      resource :reservation_reviews, only: [:show, :create]
    end
    resources :reservation_reviews, only: [:show, :update, :destroy]
  end
  
  get '*path', to: "static_pages#frontend_index"
end
