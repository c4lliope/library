require 'square'
 
# Create an instance of the API Client and initialize it with the credentials 
# for the Square account whose assets you want to manage.

client = Square::Client.new(
    access_token: "#####",
    environment: 'sandbox'
)

payments_api = client.payments
customers_api = client.customers

body = {
  source_id: '#####',
  idempotency_key: SecureRandom.uuid,
  amount_money: { amount: 200, currency: "USD" },
  app_fee_money: { amount: 10, currency: "USD" },
  autocomplete: true,
  reference_id: '123456',
  note: 'Brief description',
}

result = payments_api.create_payment(body: body)

if result.success?
  puts result.data
elsif result.error?
  warn result.errors
end
