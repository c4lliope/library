Rails.application.routes.draw do
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end
  post "/graphql", to: "graphql#execute"
  get "/session/:code", to: "sessions#claim"
  get "/holds/:landing_code", to: "holds#landing"
  
  get "/mail-money-pool", to: "library#mail_money_pool"
  get "/librarian-salary-pool", to: "library#librarian_salary_pool"
  root "library#index"
end
