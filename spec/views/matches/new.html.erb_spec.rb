require 'rails_helper'

RSpec.describe "matches/new", :type => :view do
  before(:each) do
    assign(:match, Match.new(
      :game_status_id => 1,
      :user_id => 1,
      :challenger_id => 1
    ))
  end

  it "renders new match form" do
    render

    assert_select "form[action=?][method=?]", matches_path, "post" do

      assert_select "input#match_game_status_id[name=?]", "match[game_status_id]"

      assert_select "input#match_user_id[name=?]", "match[user_id]"

      assert_select "input#match_challenger_id[name=?]", "match[challenger_id]"
    end
  end
end
