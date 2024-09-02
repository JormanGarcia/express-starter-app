import { Router } from 'express';
import { HealthController } from '@/controllers';
import { authenticate, authorize } from '@/security';

const router = Router();

router.get('/', HealthController.checkHealth);
router.get('/security/admin', authenticate, authorize(['ADMIN']), HealthController.checkHealth);
router.get('/security/user', authenticate, authorize(['USER']), HealthController.checkHealth);

export { router as HealthRouter };
