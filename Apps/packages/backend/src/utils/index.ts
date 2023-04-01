export const sleep = async (time: number): Promise<any> => {
  return new Promise((resolve, rej) => {
    setTimeout(() => resolve(true), time);
  });
};
export const deduplication = <T extends any[]>(...array: T[]): T => {
  const set = new Set();
  const res: T = [] as T;
  for (let arr of array) {
    for (let item of arr) {
      if (set.has(item.id)) {
        continue;
      }
      set.add(item.id);
      res.push(item);
    }
  }
  return res;
};
