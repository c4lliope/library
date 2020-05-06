class SessionMailer < ApplicationMailer
    default from: "librarian@#{ENV["APPLICATION_HOST"]}"

    def claim
        @session = params[:session]
        @url = "http://#{ENV["APPLICATION_HOST"]}/session/#{@session.code}"

        mail(to: @session.member.email, subject: 'Shared Library: sign in.')
    end
end
