Rails.application.routes.draw do

  root "static_pages#root"

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:new, :create, :index, :show, :update, :edit]
    resource :sessions, only: [:show]
    resources :likes, only: [:create, :index, :destroy]
    resources :interests, only: [:create, :index, :destroy]
    resources :messages, only: [:create, :update, :index, :destroy]
  end
end
