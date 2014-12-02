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
    password: 'hearmeroar1254',
    first_name: 'alex',
    last_name: 'mcritchie',
    wins: 0,
    losses: 0,
    admin: true,
    account_type: 'basic',
    email_confirmed: false
)
admin.save!

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
  user = User.new(
      id: (index+1),
      username: comp[0],
      email: "cyvasse#{index}@gmail.com",
      password: 'hearmeroar1254',
      first_name: comp[0],
      last_name: comp[1],
      wins: 0,
      losses: 0,
      admin: false,
      account_type: 'basic',
      email_confirmed: false
  )
  user.save!
end


# id2 = User.new(
#     id: 2,
#     username: 'qavo',
#     email: 'cyvasse1@gmail.com',
#     password: 'thepass',
#     first_name: 'qavo',
#     last_name: 'mcritchie',
#     wins: 0,
#     losses: 0,
#     admin: false,
#     account_type: 'basic',
#     email_confirmed: false
# )
#
# id2.save!
#
# id3 = User.new(
#     id: 2,
#     username: 'qavo',
#     email: 'cyvasse1@gmail.com',
#     password: 'thepass',
#     first_name: 'qavo',
#     last_name: 'mcritchie',
#     wins: 0,
#     losses: 0,
#     admin: false,
#     account_type: 'basic',
#     email_confirmed: false
# )
#
# id3.save!
#
# id4 = User.new(
#     id: 4,
#     username: 'qavo',
#     email: 'cyvasse1@gmail.com',
#     password: 'thepass',
#     first_name: 'qavo',
#     last_name: 'mcritchie',
#     wins: 0,
#     losses: 0,
#     admin: false,
#     account_type: 'basic',
#     email_confirmed: false
# )
#
# id4.save!
#
# id5 = User.new(
#     id: 5,
#     username: 'qavo',
#     email: 'cyvasse1@gmail.com',
#     password: 'thepass',
#     first_name: 'qavo',
#     last_name: 'mcritchie',
#     wins: 0,
#     losses: 0,
#     admin: false,
#     account_type: 'basic',
#     email_confirmed: false
# )
#
# id5.save!
#
# id6 = User.new(
#     id: 6,
#     username: 'qavo',
#     email: 'cyvasse1@gmail.com',
#     password: 'thepass',
#     first_name: 'qavo',
#     last_name: 'mcritchie',
#     wins: 0,
#     losses: 0,
#     admin: false,
#     account_type: 'basic',
#     email_confirmed: false
# )
#
# id6.save!
#
# id7 = User.new(
#     id: 7,
#     username: 'qavo',
#     email: 'cyvasse1@gmail.com',
#     password: 'thepass',
#     first_name: 'qavo',
#     last_name: 'mcritchie',
#     wins: 0,
#     losses: 0,
#     admin: false,
#     account_type: 'basic',
#     email_confirmed: false
# )
#
# id7.save!