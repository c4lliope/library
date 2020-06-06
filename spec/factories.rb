# spec/factories.rb
FactoryBot.define do
  factory :page_load do
    on { "2020-06-06 11:05:55" }
    label { "MyString" }
    address { "MyString" }
  end

  factory :bank_card do
    name { "MyString" }
    nonce { "MyString" }
  end

  factory :reimbursal do
    medium { "MyString" }
    price { "MyString" }
    paid_on { "2020-05-20 15:28:05" }
  end

  factory :pool_charge do
    pool { "MyString" }
    price { 1.5 }
    donor_handle { "MyString" }
  end

  factory :shipping_charge do
    
  end

  factory :session do
    member { nil }
    expires { "2020-05-06 14:07:04" }
    code { "" }
  end

    factory :member do
      # Use sequence to make sure that the value is unique
      sequence(:email) { |n| "member-#{n}@example.com" }
    end
  
    factory :record do
      sequence(:name) { |n| "record-#{n}" }
      member
    end
  end
  