class CreateDestinations < ActiveRecord::Migration[6.0]
  def change
    create_table :destinations do |t|
      t.string :name
      t.string :country
      t.string :language
      t.string :currency

      t.timestamps
    end
  end
end
