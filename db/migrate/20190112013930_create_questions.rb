class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.text :name
      t.references :topic, foreign_key: true
      t.text :answer

      t.timestamps
    end
  end
end
