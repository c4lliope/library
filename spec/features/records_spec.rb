require "rails_helper"

driver = Selenium::WebDriver.for :chrome

RSpec.feature "records", :js do
    scenario "displays a record" do
        create(:record, name: "Example", byline: "Foo Bar")
        
        visit "/"
        sleep 60
        expect(page).to have_text "Example by Foo Bar"
    end
end