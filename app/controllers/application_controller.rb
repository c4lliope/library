class ApplicationController < ActionController::Base
    private

    def signed_in_member
        token = request.headers["Authorization"].to_s
        email = Base64.decode64(token)
        Member.find_by(email: email)
    end
end
