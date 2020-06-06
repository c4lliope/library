class LibraryController < ApplicationController
  def index
    PageLoad.create(on: Time.current, label: "/", address: request.remote_ip)
  end

  def mail_money_pool
    PageLoad.create(on: Time.current, label: "/mail-money-pool", address: request.remote_ip)
  end

  def librarian_salary_pool
    PageLoad.create(on: Time.current, label: "/librarian-salary-pool", address: request.remote_ip)
  end
end
