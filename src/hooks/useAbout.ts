import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../lib/sanityClient";
import { aboutQuery } from "~/queries/about";

export const useAbout = () => {
  return useQuery({
    queryKey: ["about"],
    queryFn: async () => sanityClient.fetch(aboutQuery),
  });
};
