import { z } from "zod"

export const ListingSchema = z.object({
    id: z.number,
    title: z.string().min(3),
    description: z.string().optional(),
    price: z.number().positive(),
    currency: z.enum(["TRY", "USD", "EUR"]),
    city: z.string(),
    district: z.string(),
    rooms: z.number().int().positive(),
    area: z.number().positive(),
    is_for_sale: z.boolean(),
    created_at: z.iso.datetime()
})


export const ListingCreateSchema = ListingSchema.omit({
    id: true,
    created_at: true
})


export type Listing = z.infer<typeof ListingSchema>
export type ListingCreate = z.infer<typeof ListingCreateSchema>