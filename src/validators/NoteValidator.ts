import { z } from 'zod'

export const NoteSchema = z.object({
  note: z.string().trim().nonempty('Note is required').max(500, "Note must be 500 chars or less"),
})

export const NoteUpdateSchema = NoteSchema.partial()