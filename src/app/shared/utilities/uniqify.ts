export function uniqify(array, key): any {
  return array?.reduce(
    (prev, curr) => (prev.find((a) => a[key] === curr[key]) ? prev : prev.push(curr) && prev),
    []
  );
}
