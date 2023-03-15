// //import 'jsdom-global/register'
// import 'jsdom-worker'
// const WorkerMessages = require('../src/WorkerMessages')
// const PyatchPrims = require('../src/pyatchPrims')
// const fs = require('fs');
// const path = require("path");

// const code = fs.readFileSync(path.join(__dirname, '../src/pyodideWebWorker.js'), 'utf-8');

// let test_worker = new Worker(URL.createObjectURL(new Blob([code])));

// const file = path.join(__dirname, "./", "single-target-move.py");

// let test_code = fs.readFileSync(file, "utf8", function(err, data) {
//     return data;
// });

// let test_target_id_arr = ['target1'];

// let test_message = {
//     id: WorkerMessages.FromVM.AsyncRun,
//     token: "test_token",
//     python: test_code,
//     targets: test_target_id_arr
// }

// let expected = [ WorkerMessages.ToVM.BlockOP, test_target_id_arr[0], PyatchPrims.opcodeMap, 10, "test_token" ]

// test('test single target move', async () => {
//     let worker_promise = new Promise((resolve, reject) => {
//         test_worker.onmessage = (event) => {
//             resolve(event.data);
//         }
//         test_worker.postMessage(test_message);
//     });
//     let result = await worker_promise;
//     expect(result).toEqual(expected);
// })