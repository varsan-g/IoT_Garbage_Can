
// import {routes} from './0_routes/routes'

import {routes} from './0_routes/routes.js'
import { FileDump } from './2_sessions/FileDump.js';
const port = 3000;

const server = routes.listen(port, () =>{
    console.log('This server is listening at port:' + port);
} );

// Example with file dump
const data = {
    name: 'John Doe',
    age: 30,
    job: 'Software Developer'
};

let path:string ="C:\\temp\\data\\demo.txt";

const fd:FileDump  = new FileDump();

fd.dumpDataToFile(path,data);



