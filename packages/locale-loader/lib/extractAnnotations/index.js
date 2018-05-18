export default function extractAnnotations(content) {
  const annotationRegExp = /\/\/ @key: @#@(.*)@#@.*?@source: @#@(.*)@#@/g;
  const annotations = new Map();
  let match;
  /* eslint { 'no-cond-assign': 0 } */
  while ((match = annotationRegExp.exec(content)) !== null) {
    annotations.set(JSON.parse(match[1]), JSON.parse(match[2]));
  }
  return {
    content: content.replace(annotationRegExp, ''),
    annotations
  };
}
