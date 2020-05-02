# spec/factories.rb
FactoryBot.define do
    factory :member do
      # Use sequence to make sure that the value is unique
      sequence(:email) { |n| "member-#{n}@example.com" }
    end
  
    factory :record do
      sequence(:name) { |n| "record-#{n}" }
      member
    end
  end
  