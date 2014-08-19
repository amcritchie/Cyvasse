require 'rails_helper'

RSpec.describe "game_statuses/index", :type => :view do
  before(:each) do
    assign(:game_statuses, [
      GameStatus.create!(
        :p1_piece_loc => "P1 Piece Loc",
        :p2_piece_loc => "P2 Piece Loc",
        :turn => 1,
        :status => "Status"
      ),
      GameStatus.create!(
        :p1_piece_loc => "P1 Piece Loc",
        :p2_piece_loc => "P2 Piece Loc",
        :turn => 1,
        :status => "Status"
      )
    ])
  end

  it "renders a list of game_statuses" do
    render
    assert_select "tr>td", :text => "P1 Piece Loc".to_s, :count => 2
    assert_select "tr>td", :text => "P2 Piece Loc".to_s, :count => 2
    assert_select "tr>td", :text => 1.to_s, :count => 2
    assert_select "tr>td", :text => "Status".to_s, :count => 2
  end
end
