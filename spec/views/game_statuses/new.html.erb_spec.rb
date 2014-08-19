require 'rails_helper'

RSpec.describe "game_statuses/new", :type => :view do
  before(:each) do
    assign(:game_status, GameStatus.new(
      :p1_piece_loc => "MyString",
      :p2_piece_loc => "MyString",
      :turn => 1,
      :status => "MyString"
    ))
  end

  it "renders new game_status form" do
    render

    assert_select "form[action=?][method=?]", game_statuses_path, "post" do

      assert_select "input#game_status_p1_piece_loc[name=?]", "game_status[p1_piece_loc]"

      assert_select "input#game_status_p2_piece_loc[name=?]", "game_status[p2_piece_loc]"

      assert_select "input#game_status_turn[name=?]", "game_status[turn]"

      assert_select "input#game_status_status[name=?]", "game_status[status]"
    end
  end
end
