class HoldMailer < ApplicationMailer
    default from: "librarian@#{ENV["APPLICATION_HOST"]}"

    def mailing_rules
        @hold = params[:hold]

        mail(to: @hold.record.member.email, subject: 'Our Shared Library: a reservation.')
    end
end
