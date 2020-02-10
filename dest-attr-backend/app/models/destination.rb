class Destination < ApplicationRecord
  has_many :attractions;

  accepts_nested_attributes_for :attractions, :allow_destroy => true, :reject_if => :all_blank

  validates :name, presence: true, uniqueness: true
end
