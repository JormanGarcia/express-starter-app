import { ItemRepository } from '@/repositories/item.repository';

export abstract class ItemService {
  static getAll() {
    return ItemRepository.find();
  }
}
