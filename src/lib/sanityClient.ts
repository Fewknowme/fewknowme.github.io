import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: "j7nhmki2",
  dataset: "production",
  apiVersion: "2025-06-08",
  useCdn: true,
});
