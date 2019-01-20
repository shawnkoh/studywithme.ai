class CreateTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :topics do |t|
      t.text :title
      t.text :description
      t.boolean :archived, default: :false

      t.timestamps
    end
  end
end
