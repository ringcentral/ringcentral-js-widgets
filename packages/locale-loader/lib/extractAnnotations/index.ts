interface ExtractAnnotationsResult {
  content: string;
  annotations: Map<string, any>;
}

export default function extractAnnotations(content: string): ExtractAnnotationsResult {
  const annotationRegExp = /\/\/ @key: @#@(.*)@#@.*?@source: @#@(.*)@#@/g;
  const annotations = new Map<string, any>();
  let match;
  /* eslint { 'no-cond-assign': 0 } */
  while ((match = annotationRegExp.exec(content)) !== null) {
    annotations.set(JSON.parse(match[1]), JSON.parse(match[2]));
  }
  return {
    content: content.replace(annotationRegExp, ''),
    annotations,
  };
}
