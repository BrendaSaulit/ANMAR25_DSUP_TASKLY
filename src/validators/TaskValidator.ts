import { z } from 'zod'

export const TaskSchema = z.object({
  title: z.string().trim().nonempty('Title is required').max(100, "Title must be 100 chars or less"),
  category: z.enum(['WORK', 'STUDY', 'PERSONAL', 'OTHER']),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']),
  status: z.enum(['TODO', 'IN_PROGRESS', 'DONE']),
})

