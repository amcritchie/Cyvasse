# require 'rails_helper'
#
#
#
# describe "Login with Rantly. =>" do
#   before :each do
#     # create_wes_welker
#   end
#   it "clicking the login button." do
#     visit "/"
#     click_link "Matches"
#     click_link "New Match"
#     fill_in "Game status", with: 1
#     fill_in "User", with: 1
#     fill_in "Challenger", with: 2
#     click_button "Create Match"
#     # visit "/matches/1"
#     expect(page).to have_content("Match was successfully created.")
#     # click_button "Random Setup"
#     # click_button "Load Enemies"
#     # click_button "Start Game"
#
#     rabble = page.find(:css, 'img[data-index="22"]')
#     hex = page.find(:css, 'polygon[data-x-pos="2"][data-y-pos="9"]')
#     page.find(:css, '.match')
#
#     rabble.click
#     save_and_open_page
#     hex.click
#     save_and_open_page
#     # expect(page).to have_content("Mattch was successfully created.")
#
#
#     # expect(page).to have_content("Username")
#     # expect(page).to have_content("Password")
#     # expect(page).to have_button("LOGIN")
#   end
#   it "login and see flash message" do
#     # login("Welker", "pass123")
#     # expect(page).to have_content("Welcome back Wes")
#   end
# end