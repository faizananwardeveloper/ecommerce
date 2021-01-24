Rails.application.routes.draw do

  namespace :api do
    namespace :v1 do
      resources :products, only: :index
      resources :users, only: :create do
        post :login, on: :collection
        resources :orders, only: :create
      end
    end
  end

  root "home#index"
  get '*all', to: 'home#index', constraints: lambda { |req|
    req.path.exclude? 'rails/active_storage'
  }

end
