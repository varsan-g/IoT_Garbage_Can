import jwt from 'jsonwebtoken';

const secretKey = 'querty'; 

class JWTDecoder {

public validateToken(token: string): jwt.JwtPayload | null {
    try {
        return jwt.verify(token, secretKey) as jwt.JwtPayload;
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            console.error('Token is expired');
        } else if (error instanceof jwt.JsonWebTokenError) {
            console.error('Invalid token');
        } else {
            console.error('Token validation error');
        }
    }
}
} export {JWTDecoder}
