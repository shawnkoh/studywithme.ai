export function getQuestionsByTopic(topic_id, questions) {
  return Object.values(questions).filter( (question) => question.topic_id === topic_id );
}

export const overdueQuestions = (questions) => {
  let filter = (question) => question.next_revision && new Date() >= new Date(question.next_revision);
  return Object.values(questions).filter(filter);
}

// direction = asc or desc; default asc
export function sortQuestions(questions, property, direction='asc') {
  if (direction === 'asc') {
    return Object.values(questions).sort((a, b) => a[property] === b[property] ? 0 : +(a[property] > b[property]) || -1);
  } else {
    return Object.values(questions).sort((a, b) => a[property] === b[property] ? 0 : +(b[property] > a[property]) || -1);
  }
}