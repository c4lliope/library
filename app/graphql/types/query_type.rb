require "http"
require "nokogiri"

module Types
  class QueryType < Types::BaseObject
    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :records, [Types::RecordType], null: false do
      description "Library records."
      argument :only, Integer, required: false, default_value: 21, prepare: ->(only, ctx) { [only, 30].min }
      argument :search, String, required: false, default_value: nil
    end

    field :me,
      Types::MemberType,
      null: true,
      description: "Signed-in member."

    field :goodreads_search, [Types::GoodreadsResponseType], null: false do
      description "Goodreads books based on a search."
      argument :search, String, required: true
    end

    def goodreads_search(search:)
      responses = Nokogiri::XML(HTTP.get([
        "https://www.goodreads.com/search/index.xml",
        "?key=#{ENV["GOODREADS_KEY"]}",
        "&q=#{URI::encode(search)}",
      ].join))

      responses.css("results > work").map do |response|
        {
          id: response.css("best_book > id").text,
          name: response.css("best_book > title").text,
          byline: response.css("best_book > author > name").text,
          image_address: response.css("best_book > image_url").text,
        }
      end
    end

    def records(only:, search:)
      if(search)
        Record.search(search).limit(only)
      else
        Record.all.limit(only)
      end
    end

    def me
      context[:signed_in_member]
    end
  end
end
