class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.references :topic, foreign_key: true
      t.text :name
      t.json :nameJSON
      t.text :answer
      t.json :answerJSON
      t.text :difficulty
      t.json :tags
      t.datetime :next_revision

      t.timestamps
    end
  end
end
