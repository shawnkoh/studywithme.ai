class CreateTopics < ActiveRecord::Migration[5.2]
  def change
    create_table :topics do |t|
      t.text :name
      t.references :subject, foreign_key: true
      t.boolean :archived, default: false
      
      t.timestamps
    end
    add_index :topics, [:subject_id, :name], unique: true
  end
end
