require 'test_helper'

class AttemptTest < ActiveSupport::TestCase
  def setup
    @question = questions("What is a class?")
    @attempt = @question.attempts.build(difficulty: "Easy", duration: 1.minute)
  end

  test "should be valid" do
    assert @attempt.valid?
  end

  test "difficulty must be present" do
    @attempt.difficulty = "        "
    assert_not @attempt.valid?
  end

  test "duration must be present" do
    @attempt.duration = "       "
    assert_not @attempt.valid?
  end
end
