import Worker from 'web-worker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const url = new URL('../src/pyodideWebWorker.mjs', import.meta.url);
const worker = new Worker(url, { type: 'module' });

worker.onmessage = function (e) {
    console.log(e);
}

worker.onerror = function (e) {
    console.log(e);
}

const python_code = 'print("Hello World")'
const target_arr = ['target1'];

const message = {
    id: "AsyncRun",
    token: "token",
    python: python_code,
    targets: target_arr,
}

worker.postMessage(message);