import { Router } from 'express';
import { validate } from '@/middlewares/validation';
import { AuthController } from '@/controllers';
import { LoginRequestDTO, SignupRequestDTO } from '@/dtos/auth.dto';

const router = Router();

router.post('/login', validate(LoginRequestDTO), AuthController.login);
router.post('/signup', validate(SignupRequestDTO), AuthController.signup);

export { router as AuthRouter };
