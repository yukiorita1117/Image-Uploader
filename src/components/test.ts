// const checkObj = (object) => {
//   for (let e in object) {
//     return false;
//   }
//   return true;
// };

// console.log("空のオブジェクト::", checkObj({}));
// console.log("空でないオブジェクト::", checkObj({ name: "jhcoder" }));

export const checkObj = (object: any) => !Object.keys(object).length;

// console.log("空のオブジェクト::", checkObj({}));
// console.log(
//   "空でないオブジェクト::",
//   checkObj({ name: "jhcoder", aaaa: "aaa" })
// );
