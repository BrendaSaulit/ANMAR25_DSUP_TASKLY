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


  static async getAll(taskId:number, page: number, limit: number) {
    const skip = (page - 1) * limit;

    const [allNotes, count] = await Promise.all([
        NoteRepository.findAll(taskId, skip, limit),
        NoteRepository.countAll(taskId),
      ]);

      const totalPages = Math.ceil(count / limit);

      if (count === 0) {
        return {
          count: 0,
          page,
          pages: 0,
          data: [],
        };
      }
    
      return {
        count,
        page,
        pages: totalPages,
        data: allNotes,
      };
    }

     static async update(id: number, data: any){
            const updatedNote = await NoteRepository.update(id, data);
      
              if (!updatedNote) {
                throw new Error('Note not found');
              }
              
            return {
              data: updatedNote
            }
          }
}
