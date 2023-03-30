export const sleep = async (time: number): Promise<any> => {
  return new Promise((resolve, rej) => {
    setTimeout(() => resolve(true), time);
  });
};
