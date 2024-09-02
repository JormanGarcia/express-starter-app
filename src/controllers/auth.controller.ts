import { AuthService } from '@/services/auth.service';
import { LoginRequestDTO, LoginResponseDTO, SignupRequestDTO } from '@/dtos/auth.dto';
import { ResponseEntity } from '@/utils/response-entity';
import { RequestWithBody } from '@/types';

export abstract class AuthController {
  static async login(req: RequestWithBody<LoginRequestDTO>) {
    const { email, password } = req.body;
    const token = await AuthService.login(email, password);
    return new LoginResponseDTO(token);
  }

  static async signup(req: RequestWithBody<SignupRequestDTO>) {
    const response = await AuthService.signup(req.body);
    return new ResponseEntity(response, 202);
  }
}
