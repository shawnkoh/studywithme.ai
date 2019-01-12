class Topic < ApplicationRecord
  belongs_to :subject
  
  validates :name, presence: true, uniqueness: { scope: :subject }
end
