require 'test_helper'

class TopicTest < ActiveSupport::TestCase
  def setup
    @subject = subjects(:CS1010J)
    @topic = @subject.topics.build(name: "Arrays")
  end

  test "should be valid" do
    assert @topic.valid?
  end

  test "name must be present" do
    @topic.name = "       "
    assert_not @topic.valid?
  end

  test "name must be unique" do
    duplicate_topic = @topic.dup
    @topic.save
    assert_not duplicate_topic.valid?
  end

  test "different subjects can have the same topic name" do
    @topic.save
    other_subject = subjects(:GET1023)
    other_topic = other_subject.topics.build(name: "Arrays")
    assert other_topic.valid?
  end

  test "topics should be destroyed when subject is destroyed" do
    @topic.save
    topics_to_destroy = @subject.topics.count * -1
    assert_difference 'Topic.count', topics_to_destroy do
      @subject.destroy
    end
  end
end
