// import {routes} from './0_routes/routes'
import { routes } from './0_routes/routes.js';
const port = 3000;
const server = routes.listen(port, () => {
    console.log('This server is listening at port:' + port);
});
//# sourceMappingURL=launch.js.map