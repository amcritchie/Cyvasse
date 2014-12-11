require 'rails_helper'
ActiveRecord::Base.logger.level = 1
# config.logger = Logger.new('/dev/null')


def set_seeds
  admin = User.create!(
      id: 1,
      username: 'admin',
      email: 'amcritchie@gmail.com',
      password: 'password1',
      first_name: 'alex',
      last_name: 'mcritchie',
      wins: 0,
      losses: 0,
      admin: true,
      account_type: 'basic',
      email_confirmed: false
  )

  computers = [
      ['qavo','nogarys'],
      ['tyrion','lannister'],
      ['haldon','halfmaester'],
      ['doran', 'martell'],
      ['ben','plumm'],
      ['aegon', 'targaryen'],
      ['alexx','mcritchie'],
      ['alexxx','mcritchie'],
      ['alexxxx', 'mcritchie']
  ]

  computers.each_with_index do |comp,index|
    user = User.create!(
        id: index+2,
        username: comp[0],
        email: "cyvasse#{index}@gmail.com",
        password: 'password1',
        first_name: comp[0],
        last_name: comp[1],
        # image: "assets/images/#{comp[0]+comp[1]}.jpg",
        wins: 0,
        losses: 0,
        admin: false,
        account_type: 'basic',
        email_confirmed: false
    )
  end
end

def register(username, password, email)
  visit root_path
  click_link 'New Player'
  fill_in 'Username', with: username
  fill_in 'Password', with: password
  fill_in 'Email', with: email
  click_button 'Create User'
end

def create_jamie
  register('kingslayer','password1','jamie@lannister.com')
end

describe "Landing page =>" do
  before :each do
    set_seeds
  end

  it 'Root page, with no session' do
    visit root_path
    expect(page).to have_content('Hi, Welcome To Cyvasse')
    expect(page).to have_link('Cyvasse')
    expect(page).to have_link('About')
    expect(page).to have_link('Contact')
    expect(page).to have_link('Login')
    expect(page).to have_link('New Player')
  end

  it 'New User can register and be directed to a game against the computer' do
    visit root_path
    click_link 'New Player'
    expect(page).to have_content('New User')
    expect(page).to have_content('Information:')
    fill_in 'Username', with: 'Jonsnow'
    fill_in 'Password', with: 'Watcheronthewall'
    fill_in 'Email', with: 'Jon@snow.com'
    click_button 'Create User'
    expect(page).to have_content('Jonsnow')
    expect(page).to have_content('vs')
    expect(page).to have_content('Qavo')
  end

  it 'Username and Email must be unique' do
    register('kingslayer','password1','jamie@lannister.com')
    click_link 'Logout'
    register('kingslayer','password1','jamie@lannister.com')
    expect(page).to have_content('Username has already been taken')
    expect(page).to have_content('Email has already been taken')
  end

  it 'Username, password, and email must be filled in' do
    visit root_path
    click_link 'New Player'
    click_button 'Create User'
    expect(page).to have_content("Username can't be blank")
    expect(page).to have_content("Password can't be blank")
    expect(page).to have_content("Email can't be blank")
  end

  it 'Password must be at least 8 characters' do
  register('kingslayer','','jamie@lannister.com')
  expect(page).to have_content("Password digest is too short (minimum is 8 characters)")
  end

  it 'User can logout, then in again' do
    create_jamie
    click_link 'Logout'
    expect(page).to have_content('Hi, Welcome To Cyvasse')
    first(:link, 'Login').click
    fill_in 'Username', with: 'kingslayer'
    fill_in 'Password', with: 'password1'
    click_button 'Sign In'
    expect(page).to have_content('Welcome back kingslayer')
  end

  it 'receives error if username or password is wrong' do
    create_jamie
    click_link 'Logout'
    first(:link, 'Login').click
    fill_in 'Password', with: 'password1'
    click_button 'Sign In'
    expect(page).to have_content('Username / password is invalid.')
    fill_in 'Username', with: 'kingslayer'
    click_button 'Sign In'
    expect(page).to have_content('Username / password is invalid.')
    fill_in 'Username', with: 'kingslayer'
    fill_in 'Password', with: 'password1'
    click_button 'Sign In'
    expect(page).to have_content('Welcome back kingslayer')
  end
end