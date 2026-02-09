import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SECRET_KEY', // Debe ser la misma que en AuthModule
    });
  }

  async validate(payload: any) {
    // Lo que retornes aquí se inyectará en el objeto Request (req.user)
    return { userId: payload.sub, email: payload.email, role: payload.role };
  }
}