require "rails_helper"

RSpec.describe Graph::QueryType do
  describe "records" do
    let!(:records) { create_pair(:record) }

    let(:query) do
      %(query {
        records {
          name
        }
      })
    end

    subject(:result) do
      LibrarySchema.execute(query).as_json
    end

    it "returns all records" do
      expect(result.dig("data", "records")).to match_array(
        records.map { |record| { "name" => record.name } }
      )
    end
  end
end
