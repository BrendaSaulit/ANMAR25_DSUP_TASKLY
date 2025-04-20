import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export class NoteRepository {   
  static async create(data: { note: string; task_id: number;}) {
    return await prisma.note.create({ data });
  }

  static async delete(id: number) {

    return await prisma.note.delete({
        where: {id}
    });
  }  

}
