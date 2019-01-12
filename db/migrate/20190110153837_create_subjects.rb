class CreateSubjects < ActiveRecord::Migration[5.2]
  def change
    create_table :subjects do |t|
      t.text :name
      t.references :user, foreign_key: true

      t.timestamps
    end
    add_index :subjects, [:user_id, :name], unique: true
  end
end
