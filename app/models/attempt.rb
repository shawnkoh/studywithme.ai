class Attempt < ApplicationRecord
  belongs_to :question
  
  validates :difficulty, presence: true
  validates :duration, presence: true
end
