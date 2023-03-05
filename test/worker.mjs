import Worker from 'web-worker';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// var chai = require("chai");
// var sinon = require("sinon");
// var sinonChai = require("sinon-chai");

import chai from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';

var expect = chai.expect;
chai.use(sinonChai);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//import WorkerMessages from '../src/WorkerMessages';

const sleep = t =>
	new Promise(r => {
		setTimeout(r, t);
	});

describe('Pyatch worker', () => {
	describe('Motion prims', () => {
		it('move', async () => {

			const url = new URL('../src/pyodideWebWorker.mjs', import.meta.url);
			const worker = new Worker(url, { type: 'module' });
			const spy = sinon.spy();
			worker.onmessage = spy;

			const python_code = fs.readFileSync(path.join(__dirname, './', 'single-target-move.py'), 'utf8');
			const target_arr = ['target1'];	

			const message = {
				id: "AsyncRun",
				token: "token",
				python: python_code,
				targets: target_arr,
			}

			worker.postMessage(message);

			await sleep(500);

			let last_call_data = spy.getCalls().slice(-1)[0].firstArg.data;
			expect(last_call_data).to.equal({ id: 'BlockOP', targetID: 'target1', op_code: 'move', args: [ 10 ], token: null});
		});
	});
});
