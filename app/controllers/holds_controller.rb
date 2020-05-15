class HoldsController < ApplicationController
    def landing
        landing_code = params[:landing_code]

        @hold = Hold.find_by(landing_code: landing_code)
        @hold.update(landed_on: Time.current)
    end
end