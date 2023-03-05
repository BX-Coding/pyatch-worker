
var WorkerMessages = {


    ToVM: {
        PyodideLoading: 'PyodideLoading',
        PyodideLoaded: 'PyodideLoaded',
        PythonLoading: 'PythonLoading',
        PythonRunning: 'PythonRunning',
        PythonStopped: 'PythonStopped',
        BlockOP: 'BlockOP',
    },

    FromVM: {

        VMConnected: 'VMConnected',


        AsyncRun: 'AsyncRun',

        ResultValue: 'ResultValue'
    }


};

module.exports = WorkerMessages;