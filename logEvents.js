const { format } = require('date-fns');
const { v4: uuid } = require('uuid');

const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

const logEvents = async (message, logName) => {
    const dateTime = `${format(new Date(), 'yyyy, MM dd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    console.log(logItem);
    try{
        if (!fs.existsSync(path.join(__dirname, 'logs'))){
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', logName), logItem);
    } catch(err) {
        console.log(err);
    }
}

module.exports = logEvents;

// CALL LIKE:
// const logEvents = require('./logEvents');

// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {};

// // initialize object
// const myEmitter = new MyEmitter();

// // add listener for log event
// myEmitter.on('log', (msg) => logEvents(msg));

// setTimeout(() => {
//     //Emit event
//     myEmitter.emit('log', 'Log Event Emitted');
// }, 2000);