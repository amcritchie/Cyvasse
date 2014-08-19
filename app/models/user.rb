class User < ActiveRecord::Base
  has_many :matches
  has_secure_password


  validates_uniqueness_of :first_name
end
