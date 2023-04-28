import { UserEntity } from "src/user/user.entity";

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
export const interestsJsonToVector = <T extends string>(
  interestsJson: T
): number[] => {
  const vector = [];
  const interest = JSON.parse(interestsJson);
  for (const category in interest) {
    vector.push(interest[category]);
  }
  return vector;
};
