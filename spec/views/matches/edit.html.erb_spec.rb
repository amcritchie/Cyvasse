require 'rails_helper'

RSpec.describe "matches/edit", :type => :view do
  before(:each) do
    @match = assign(:match, Match.create!(
      :game_status_id => 1,
      :user_id => 1,
      :challenger_id => 1
    ))
  end

  it "renders the edit match form" do
    render

    assert_select "form[action=?][method=?]", match_path(@match), "post" do

      assert_select "input#match_game_status_id[name=?]", "match[game_status_id]"

      assert_select "input#match_user_id[name=?]", "match[user_id]"

      assert_select "input#match_challenger_id[name=?]", "match[challenger_id]"
    end
  end
end
