import { ItemService } from '@/services/item.service';

export abstract class ItemController {
  static async getItems() {
    const response = await ItemService.getAll();
    return response;
  }
}
