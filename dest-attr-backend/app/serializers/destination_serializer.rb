class DestinationSerializer < ActiveModel::Serializer
  attributes :id, :name, :country, :language, :currency
  has_many :attractions
end
