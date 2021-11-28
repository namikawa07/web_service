class CreateHellos < ActiveRecord::Migration[6.0]
  def change
    create_table :hellos do |t|
      t.string :hello_string
      t.text :hello_text
      t.timestamps
    end
  end
end
