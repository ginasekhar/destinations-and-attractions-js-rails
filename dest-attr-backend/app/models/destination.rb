class Destination < ApplicationRecord
  has_many :attractions, :dependent => :destroy

  accepts_nested_attributes_for :attractions,  :reject_if => :all_blank

  validates :name, presence: true, uniqueness: true
end
