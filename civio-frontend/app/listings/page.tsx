"use client"

import { useListings } from "@/features/listings/hooks"

export default function ListingsPage() {
    const { data, isLoading, error } = useListings()

    if (isLoading) return <p>Loading...</p>
    if (error) return <p>Error loading listings</p>

    return (
        <ul>
            {data?.map((l) => (
                <li key={l.id}>
                    {l.title} – {l.price} {l.currency}
                </li>
            ))}
        </ul>
    )
}
