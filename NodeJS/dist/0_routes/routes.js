import * as dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import bodyParser from 'body-parser';
dotenv.config({ path: 'config/middleware.env' });
const routes = express();
routes.use(cors());
routes.use(express.static('public'));
routes.use(bodyParser.urlencoded({ extended: false }));
routes.use(bodyParser.json());
import { LoginEndpoint } from '../1_endpoints/LoginEndpoint.js';
// DB.connect(); // SENERE
routes.post('/api/logon', (req, res) => {
    return LoginEndpoint.evaluate(req, res);
});
// #1
routes.get('/api/products', async (req, res) => {
    try {
        // example without database
        return res.status(200).json("[{'productID':4,'title':'milk'},'productID':5,'title':'coffee'}]");
    }
    catch (e) {
        console.error('routes readAll, ' + e);
    }
});
// The default (all other not valid routes)
routes.get('*', (req, res) => {
    return res.status(404).send('no such route');
});
export { routes };
//# sourceMappingURL=routes.js.map