class HoldMailer < ApplicationMailer
    default from: "librarian@#{ENV["APPLICATION_HOST"]}"

    def mailing_rules
        @hold = params[:hold]
        mail(to: @hold.record.member.email, subject: 'Our Shared Library: a hold has been placed.')
    end

    def landing_rules
        @hold = params[:hold]
        @landing_address = "http://#{ENV["APPLICATION_HOST"]}/holds/#{@hold.landing_code}"
        mail(to: @hold.member.email, subject: "Our Shared Library: your hold is pending.")
    end
end
