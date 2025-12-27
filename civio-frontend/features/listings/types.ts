
export type Listing = {
    id: number
    title: string
    description?: string
    price: number
    currency: "TRY" | "USD" | "EUR"
    city: string
    district: string
    rooms: number
    bathrooms: number
    area: number
    is_for_sale: boolean
    created_at: string
}


export type ListingCreate = Omit<Listing, "id" | "created_at">