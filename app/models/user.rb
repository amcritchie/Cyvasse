class User < ActiveRecord::Base
  has_many :matches
  has_secure_password

  validates_presence_of :first_name, :last_name, :username, :email, :password_digest
  validates_uniqueness_of :username, :email
end
