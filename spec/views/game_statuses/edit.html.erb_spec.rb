require 'rails_helper'

RSpec.describe "game_statuses/edit", :type => :view do
  before(:each) do
    @game_status = assign(:game_status, GameStatus.create!(
      :p1_piece_loc => "MyString",
      :p2_piece_loc => "MyString",
      :turn => 1,
      :status => "MyString"
    ))
  end

  it "renders the edit game_status form" do
    render

    assert_select "form[action=?][method=?]", game_status_path(@game_status), "post" do

      assert_select "input#game_status_p1_piece_loc[name=?]", "game_status[p1_piece_loc]"

      assert_select "input#game_status_p2_piece_loc[name=?]", "game_status[p2_piece_loc]"

      assert_select "input#game_status_turn[name=?]", "game_status[turn]"

      assert_select "input#game_status_status[name=?]", "game_status[status]"
    end
  end
end
