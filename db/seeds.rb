# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.features)

User.destroy_all

admin = User.new(
    id: 1,
    username: 'admin',
    email: 'amcritchie@gmail.com',
    password: 'thepass',
    first_name: 'alex',
    last_name: 'mcritchie',
    wins: 0,
    losses: 0,
    admin: false,
    account_type: 'basic',
    email_confirmed: false
)

admin.save!
