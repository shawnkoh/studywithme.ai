export const overdueQuestions = (questions) => {
  let filter = (question) => question.next_revision && new Date() >= new Date(question.next_revision);
  return Object.values(questions).filter(filter);
}

export function getQuestionsByTopic(topic_id, questions) {
  return Object.values(questions).filter( (question) => question.topic_id === topic_id );
}
