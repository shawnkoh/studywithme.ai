class Question < ApplicationRecord
  belongs_to :topic
  
  validates :name, presence: true
end
