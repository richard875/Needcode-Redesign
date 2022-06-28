const NestedObjectLength = (obj: any): number => {
  let length = 0;
  const copiedObject = Object.assign({}, obj);

  Object.entries(copiedObject).forEach((item) => {
    const copiedQuestionSet = Object.assign({}, item[1]);
    length += Object.keys(copiedQuestionSet).length;
  });

  return length;
};

export default NestedObjectLength;
