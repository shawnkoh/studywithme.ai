class Question < ApplicationRecord
  belongs_to :topic
  include AlgoliaSearch
  algoliasearch do
    attribute :name, :answer, :difficulty, :tags, :next_revision
    searchableAttributes ['name', 'answer', 'tags', 'next_revision', 'difficulty']
  end
end
