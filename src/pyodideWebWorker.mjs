
import PyatchPrims from './pyatchPrims.js';
import WorkerMessages from './WorkerMessages.js';
import { loadPyodide } from 'pyodide';

const context = {
  PyatchPrims: PyatchPrims,
}


/**
 * Mapping of message token to Promise resolve function.
 * @type {Object.<string, Promise>}
 * @private
 */
let _pendingTokens = {};


async function initPyodide() {
  _postStatusMessage(WorkerMessages.ToVM.PyodideLoading)
  self.pyodide = await loadPyodide({
    indexURL: "/Users/elliotroe/Documents/GitHub/pyatch-worker/node_modules/pyodide",
  });
  _postStatusMessage(WorkerMessages.ToVM.PyodideLoaded)
}

// This is a shit function for this purpose, but it works for now.
function _getToken() {
  return Math.random().toString(36).substring(2);
}

function _resolvePendingToken(token, value) {
  if (self._pendingTokens[token]) {
    self._pendingTokens[token](value);
    delete self._pendingTokens[token];
  }
}

function _postBlockOpMessage(targetID, op_code, args) {
  let token = _getToken();
  let id = WorkerMessages.ToVM.BlockOP
  return new Promise(function (resolve) {
    _pendingTokens[token] = resolve;
    _postMessage(id, targetID, op_code, args, token)
    });
}

function _postStatusMessage(id) {
  _postMessage(id, null, null, null, null)
}

function _postMessage(id, targetID, op_code, args, token) {
  _postWorkerMessage({id, targetID, op_code, args, token});
}

function _postWorkerMessage(message) {
  return;
}

function _run(pythonScript,  targets) {

  // Don't need this line as we will be passing the bridge module in as a parameter as we execute 
  //await self.pyodide.loadPackagesFromImports(python);
  _postStatusMessage(WorkerMessages.ToVM.PythonLoading)

  // This is load each async function into the global scope of the pyodide instance
  self.pyodide.runPython(pythonScript);
  _postStatusMessage(WorkerMessages.ToVM.PythonRunning);

  // TODO: Need to loop through each async function in the global scope and run them concurrently

  _postBlockOpMessage(targets[0], 'move', [10]);
}

function onVMMessage(event) {
  const { id, token, ...data } = event.data;
  if (id === WorkerMessages.FromVM.AsyncRun) {
    _run(data.python, data.targets);
  } else if (id === WorkerMessages.FromVM.ResultValue) {
    _resolvePendingToken(token, data.value);
  } else if (id === WorkerMessages.FromVM.VMConnected) {
    _initWorker();
  }

}

self.onmessage = onVMMessage;
_postWorkerMessage = postMessage;

await initPyodide();