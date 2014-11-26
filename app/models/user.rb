class User < ActiveRecord::Base
  has_many :matches
  has_secure_password

  validates_presence_of :username, :email, :password_digest
  validates_uniqueness_of :username, :email
  validates :password_digest, length: {minimum: 4}
end
