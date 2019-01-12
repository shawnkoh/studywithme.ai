require 'test_helper'

class QuestionTest < ActiveSupport::TestCase
  def setup
    @topic = topics(:OOP)
    @question = @topic.questions.build(name: "What is the definition of OOP?", answer: "OOP refers to a type of computer programming (software design) in which programmers define not only the data type of a data structure, but also the types of operations (functions) that can be applied to the data structure.")
  end

  test "should be valid" do
    assert @question.valid?
  end

  test "name must be present" do
    @question.name = "        "
    assert_not @question.valid?
  end

  test "questions should be deleted when topic is destroyed" do
    @question.save
    questions_to_destroy = @topic.questions.count * -1
    assert_difference 'Question.count', questions_to_destroy do
      @topic.destroy
    end
  end
end
