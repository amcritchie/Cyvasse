require 'rails_helper'

RSpec.describe "game_statuses/show", :type => :view do
  before(:each) do
    @game_status = assign(:game_status, GameStatus.create!(
      :p1_piece_loc => "P1 Piece Loc",
      :p2_piece_loc => "P2 Piece Loc",
      :turn => 1,
      :status => "Status"
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/P1 Piece Loc/)
    expect(rendered).to match(/P2 Piece Loc/)
    expect(rendered).to match(/1/)
    expect(rendered).to match(/Status/)
  end
end
