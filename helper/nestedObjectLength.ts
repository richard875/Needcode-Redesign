const NestedObjectLength = (obj: any, blindQuestions: boolean): number => {
  let numberOfCompletedQuestion = 0;
  const copiedObject = Object.assign({}, obj);

  Object.entries(copiedObject).forEach((item) => {
    const copiedQuestionSet = Object.assign({}, item[1]);

    Object.entries(copiedQuestionSet).forEach((item) => {
      if (blindQuestions) {
        if (item[1] == 1) numberOfCompletedQuestion++;
      } else {
        numberOfCompletedQuestion++;
      }
    });
  });

  return numberOfCompletedQuestion;
};

export default NestedObjectLength;
