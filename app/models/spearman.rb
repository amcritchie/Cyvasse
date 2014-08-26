class Spearman < ActiveRecord::Base

  def initialize
  end

  def self.attributes
    attributes = {
        :name => "Spearman",
        :movement => 2,
        :strength => 2,
        :flank => 2,
        :trump => ["Light Horse","Heavy Horse"]
    }
  end

end