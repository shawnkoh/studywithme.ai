class Question < ApplicationRecord
  belongs_to :topic
  has_many :attempts, dependent: :destroy
  
  validates :name, presence: true
end
