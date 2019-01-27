class Topic < ApplicationRecord
  has_many :questions, dependent: :destroy
  include AlgoliaSearch
  algoliasearch do
    attribute :title, :description, :archived
    searchableAttributes ['title', 'description', 'archived']
  end
end
