import jwt from 'jsonwebtoken';

interface JWTFactory {
    createToken(payload: object, expiresIn: string | number): string;
}

class JWTFactoryImpl implements JWTFactory {
    private secretKey: string;

    constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    createToken(payload: object, expiresIn: string | number): string {
        return jwt.sign(payload, this.secretKey, { expiresIn });
    }
} export {JWTFactoryImpl}
