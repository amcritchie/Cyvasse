# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141206145240) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favorites", force: true do |t|
    t.integer "favoriter"
    t.integer "favorited"
  end

  create_table "matches", force: true do |t|
    t.integer  "home_user_id"
    t.integer  "away_user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "turn"
    t.integer  "who_started"
    t.string   "match_status"
    t.string   "match_against"
    t.string   "home_units_position"
    t.string   "away_units_position"
    t.integer  "whos_turn"
    t.boolean  "home_ready"
    t.boolean  "away_ready"
  end

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "wins"
    t.integer  "losses"
    t.boolean  "email_confirmed"
    t.string   "account_type"
    t.boolean  "admin"
    t.string   "first_name"
    t.string   "last_name"
    t.string   "image"
  end

  create_table "world_statuses", force: true do |t|
    t.integer  "match_id"
    t.string   "home_units_position"
    t.string   "away_units_position"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
