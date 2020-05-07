require_relative 'application'

ActionMailer::Base.smtp_settings = {
  :user_name => ENV["SENDGRID_USERNAME"],
  :password => ENV["SENDGRID_PASSWORD"],
  :domain => ENV["APPLICATION_HOST"],
  :address => 'smtp.sendgrid.net',
  :port => 465,
  :authentication => :plain,
  :enable_starttls_auto => true
}

Rails.application.initialize!
