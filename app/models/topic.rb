class Topic < ApplicationRecord
  belongs_to :subject
  has_many :questions, dependent: :destroy
  
  validates :name, presence: true, uniqueness: { scope: :subject }
end