import { useQuery } from "@tanstack/react-query";
import { sanityClient } from "../lib/sanityClient";

import { Project } from "~/types/project";
import { projectsQuery } from "~/queries/project";

const fetchProjects = async (): Promise<Project[]> => {
  return sanityClient.fetch(projectsQuery);
};

export const useProjects = () => {
  return useQuery<Project[], Error>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
};
