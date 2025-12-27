import { api } from "@/lib/api-client";
import { Listing } from "./types";

export const fetchListings = async (): Promise<Listing[]> => {
    const res = await api.get("/listings/");
    return res.data;
};
