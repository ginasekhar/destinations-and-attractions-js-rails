class CreateAttractions < ActiveRecord::Migration[6.0]
  def change
    create_table :attractions do |t|
      t.string :name
      t.string :category
      t.boolean :reservations_required
      t.integer :cost
      t.belongs_to :destination, null: false, foreign_key: true

      t.timestamps
    end
  end
end
