class AttractionSerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :reservations_required, :cost
  belongs_to :destination
end
