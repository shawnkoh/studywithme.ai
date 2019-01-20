class Topic < ApplicationRecord
  has_many :questions, dependent: :destroy
end
