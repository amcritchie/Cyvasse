# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.features)

# rake db:reset

admin = User.create!(
    username: 'admin',
    email: 'amcritchie@gmail.com',
    password: 'hearmeroar1254',
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
      username: comp[0],
      email: "cyvasse#{index}@gmail.com",
      password: 'hearmeroar1254',
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
