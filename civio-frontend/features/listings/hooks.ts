import { useQuery } from "@tanstack/react-query";
import { fetchListings } from "./api";

export const useListings = () =>
    useQuery({
        queryKey: ["listings"],
        queryFn: fetchListings,
    });
