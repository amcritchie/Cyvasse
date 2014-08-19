require "rails_helper"

RSpec.describe GameStatusesController, :type => :routing do
  describe "routing" do

    it "routes to #index" do
      expect(:get => "/game_statuses").to route_to("game_statuses#index")
    end

    it "routes to #new" do
      expect(:get => "/game_statuses/new").to route_to("game_statuses#new")
    end

    it "routes to #show" do
      expect(:get => "/game_statuses/1").to route_to("game_statuses#show", :id => "1")
    end

    it "routes to #edit" do
      expect(:get => "/game_statuses/1/edit").to route_to("game_statuses#edit", :id => "1")
    end

    it "routes to #create" do
      expect(:post => "/game_statuses").to route_to("game_statuses#create")
    end

    it "routes to #update" do
      expect(:put => "/game_statuses/1").to route_to("game_statuses#update", :id => "1")
    end

    it "routes to #destroy" do
      expect(:delete => "/game_statuses/1").to route_to("game_statuses#destroy", :id => "1")
    end

  end
end
