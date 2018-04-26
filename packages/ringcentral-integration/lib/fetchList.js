
async function parallelFetch(fn, perPage, params) {
  const data = await fn({
    ...params,
    perPage,
    page: 1,
  });
  const list = data.records.slice();
  if (data.paging.totalPages > 1) {
    const promises = [];
    for (let i = data.paging.totalPages; i > 1; i -= 1) {
      promises.push(fn({
        ...params,
        perPage,
        page: i,
      }));
    }
    (await Promise.all(promises)).reduce((output, item) => {
      output.push(...item.records);
      return output;
    }, list);
  }
  return list;
}

async function serialFetch(fn, perPage, params) {
  let fetchedPages = 0;
  let totalPages = 1;
  const list = [];

  while (fetchedPages < totalPages) {
    fetchedPages += 1;
    const data = await fn({
      ...params,
      perPage,
      page: fetchedPages,
    });
    /* eslint { "prefer-destructuring": 0 } */
    totalPages = data.paging.totalPages;
    list.push(...data.records);
  }
  return list;
}

export default async function fetchList(fn, {
  perPage = 'MAX',
  parallel = true,
  ...params
} = {}) {
  return parallel ?
    parallelFetch(fn, perPage, params) :
    serialFetch(fn, perPage, params);
}
