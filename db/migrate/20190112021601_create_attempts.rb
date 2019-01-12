class CreateAttempts < ActiveRecord::Migration[5.2]
  def change
    create_table :attempts do |t|
      t.references :question, foreign_key: true
      t.string :difficulty
      t.string :duration

      t.timestamps
    end
  end
end
