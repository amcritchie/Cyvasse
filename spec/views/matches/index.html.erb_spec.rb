require 'rails_helper'

RSpec.describe "matches/index", :type => :view do
  before(:each) do
    assign(:matches, [
      Match.create!(
        :game_status_id => 1,
        :user_id => 2,
        :challenger_id => 3
      ),
      Match.create!(
        :game_status_id => 1,
        :user_id => 2,
        :challenger_id => 3
      )
    ])
  end

  it "renders a list of matches" do
    render
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => 2.to_s, :count => 2
    assert_select "tr>td", :text => 3.to_s, :count => 2
  end
end
