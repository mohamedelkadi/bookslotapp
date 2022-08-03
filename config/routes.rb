Rails.application.routes.draw do
  namespace :api do
    get 'durations/index'
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'welcome#index'
end
