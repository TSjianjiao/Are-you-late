// 眉笔总数统计
// db.getCollection('signins').aggregate([
//   {
//     $match : {
//       point : {
//         $lt: 5
//       },
//     },
//   },
//   {
//     $group: {
//       _id: '$qq',
//       count: { $sum: 1 }
//     }
//   },
//   {
//     $sort: { count: -1 }
//   }
// ])
