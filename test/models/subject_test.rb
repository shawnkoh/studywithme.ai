require 'test_helper'

class SubjectTest < ActiveSupport::TestCase
  def setup
    @user = users(:michael)
    @subject = @user.subjects.build(name: "MA1521")
  end

  test "should be valid" do
    assert @subject.valid?
  end

  test "name must be present" do
    @subject.name = "       "
    assert_not @subject.valid?
  end

  test "name must be unique" do
    duplicate_subject = @subject.dup
    @subject.save
    assert_not duplicate_subject.valid?
  end

  test "different users can have the same subject name" do
    @subject.save
    other_user = users(:archer)
    other_subject = other_user.subjects.build(name: @subject.name)
    assert other_subject.valid?
  end

  test "subjects should be destroyed when user is destroyed" do
    @subject.save
    subjects_to_destroy = @user.subjects.count * -1
    assert_difference 'Subject.count', subjects_to_destroy do
      @user.destroy
    end
  end
end
