import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../lib/sanityClient";

import { testimonialQuery } from "~/queries/testimonial";
import { Testimonial } from "~/types/testimonial";

const fetchTestimonials = async (): Promise<Testimonial[]> => {
  return sanityClient.fetch(testimonialQuery);
};

export const useTestimonial = () => {
  return useQuery<Testimonial[], Error>({
    queryKey: ["testimonials"],
    queryFn: fetchTestimonials,
  });
};
