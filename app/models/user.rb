class User < ActiveRecord::Base
  has_many :matches
  validates_uniqueness_of :first_name
end
