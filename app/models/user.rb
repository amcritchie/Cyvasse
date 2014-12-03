class User < ActiveRecord::Base
  has_secure_password

  has_many :matches

  validates_presence_of :username, :email, :password_digest
  validates_uniqueness_of :username, :email
  validates :password_digest, length: {minimum: 4}

  def first_name
    first_name.capitalize
  end

  def full_name
    first_name.capitalize + " " + last_name.capitalize
  end
end
