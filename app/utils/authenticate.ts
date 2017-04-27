import {getConfig} from "../config/server-config";
let jwt = require('jwt-simple');

export const jwtConfig = {secret: getConfig().authConfig.authSecret};

class AuthUtils {
    public createToken(user: any, ctx: any) {
        return jwt.encode({
            username: user.username,
            _id: user._id
        }, jwtConfig.secret, null, {expiresIn: 60 * 60 * 60 /*secs*/});
    }

    public decodeToken(token: any) {
        return jwt.decode(token, jwtConfig.secret);
    }
}

export const authJwt = new AuthUtils();
