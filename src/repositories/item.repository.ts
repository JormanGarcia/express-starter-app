import { Item } from '@/models';
import { DatabaseClient } from '@/database';

export const ItemRepository = DatabaseClient.getRepository(Item);
