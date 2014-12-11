require 'rails_helper'

describe 'Matches =>' do
  before :each do
    set_seeds
  end
  it 'Match can be created' do
    create_jamie
    click_link 'Cyvasse'
    expect(page).to have_content('Play Computer')
    expect(page).to have_content('Resign')
    click_link 'Resign'
    expect(page).to_not have_content('Resign')
  end

end