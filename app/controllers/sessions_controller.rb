class SessionsController < ApplicationController
    def claim
        session = Session.find_by(code: params[:code])

        if session
            if session.claimed
                @error = "Your session has already been claimed."
            else
                Session.update(claimed: Time.current)
                @code = session.code
            end
        else
            @error = "Your session link is unrecognized."
        end
    end
end