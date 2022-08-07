Rails.application.routes.draw do
  namespace :api do
    get 'slots' , to: 'slots#index'
    post 'slots/book', to: 'slots#book'
  end
  get 'debug', to: 'welcome#debug'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'welcome#index'
end
