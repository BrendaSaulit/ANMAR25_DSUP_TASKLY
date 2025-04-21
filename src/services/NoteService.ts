import { NoteRepository } from '../repositories/NoteRepository';

export class NoteService {
  static async create(data: { note: string; task_id: number }) {
    return await NoteRepository.create(data);
  }

   static async delete(id: number) {
      const note = await NoteRepository.findById(id);
  
      if (!note) {
        throw new Error('Note not found');
      }
  
      return await NoteRepository.delete(id);
    }

        static async getById(id: number){
          const note = await NoteRepository.findById(id);
    
            if (!note) {
              throw new Error('Note not found');
            }
            
          return {
            data: note
          }
        }
}
