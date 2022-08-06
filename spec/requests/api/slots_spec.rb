require 'rails_helper'

RSpec.describe "Api::Slots", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/api/slots/index"
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /book" do
    it "returns http success" do
      get "/api/slots/book"
      expect(response).to have_http_status(:success)
    end
  end

end
