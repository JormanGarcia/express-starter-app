import { ItemController } from '@/controllers/item.controller';
import { AuthenticatedRoute, authorize } from '@/security';

const router = AuthenticatedRoute();

router.get('/', authorize(['ADMIN', 'USER']), ItemController.getItems);

export { router as ItemRouter };
