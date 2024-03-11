
import {routes} from './0_routes/routes.js';

import jwt from 'jsonwebtoken';
import { JWTDecoder } from './2_sessions/JWTDecoder.js';

import { JWTFactoryImpl } from './2_sessions/JWTFactory.js';

// Kør disse kommandolinje instruktioner for at installere jwt biblioteket
// npm install jsonwebtoken
// npm i --save-dev @types/jsonwebtoken
const port = 3000;

// Vi laver to tokens:

const jwtFactory = new JWTFactoryImpl('querty');

const payload1 = { userId: 123 };
const token1 = jwtFactory.createToken(payload1, '1h'); // levetid 1 time
console.log('Her er et token der lever 1 time:',token1);

const payload2 = { userId: 456 };
const token2 = jwtFactory.createToken(payload1, '1m'); // levetid 1 minut
console.log('Her er et token der lever 1 minut:',token2);

const decoder:JWTDecoder = new JWTDecoder();

let value:jwt.JwtPayload = decoder.validateToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEyMywiaWF0IjoxNzA5NzE4MjkyLCJleHAiOjE3MDk3MTgzNTJ9.pEJy163eM9KM5g-0oAE-01S8RLgljKGxKh-6Kf0WoiU');

console.log('Her er den decodede værdi:',value);

const server = routes.listen(port, () =>{
    console.log('This server is listening at port:' + port);
} );
