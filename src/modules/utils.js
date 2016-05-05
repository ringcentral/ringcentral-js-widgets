async function requestAllPagesTogether(target, request, options) {
  const option = {
    ...options,
    page: 1,
  };
  const firstResp = await request.call(target, option);
  const results = firstResp.records;
  if (firstResp.paging && firstResp.paging.totalPage > 1) {
    const otherResults = await this.requestPagesTogether(
      2, firstResp.paging.totalPage - 1, target, request, options);
    results.push(...otherResults);
  }
  return results;
}

async function requestPagesTogether(startPage, endPage, target, request, options) {
  const requests = [];
  for (let i = startPage; i <= endPage; i++) {
    const option = {
      ...options,
      page: i,
    };
    requests.push(request.call(target, option));
  }
  return Promise.all(requests).then(resps => {
    const results = [];
    resps.forEach(resp => {
      results.push(...resp.records);
    });
    return results;
  });
}

export {
  requestAllPagesTogether,
  requestPagesTogether,
};
