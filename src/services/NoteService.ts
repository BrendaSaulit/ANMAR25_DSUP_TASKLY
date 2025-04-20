import { NoteRepository } from '../repositories/NoteRepository';

export class NoteService {
  static async create(data: { note: string; task_id: number }) {
    return await NoteRepository.create(data);
  }
}
