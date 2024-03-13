// import {routes} from './0_routes/routes'
import { routes } from './0_routes/routes.js';
const port = 3000;
const server = routes.listen(port, () => {
    console.log('This server is listening at port:' + port);
});
// Example with file dump
const data = {
    name: 'John Doe',
    age: 30,
    job: 'Software Developer'
};
//# sourceMappingURL=launch.js.map