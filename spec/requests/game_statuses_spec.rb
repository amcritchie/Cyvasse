require 'rails_helper'

RSpec.describe "GameStatuses", :type => :request do
  describe "GET /game_statuses" do
    it "works! (now write some real specs)" do
      get game_statuses_path
      expect(response.status).to be(200)
    end
  end
end
