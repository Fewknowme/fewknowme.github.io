// types/project.ts
import { PortableTextBlock } from "@portabletext/types";

export interface Project {
  _id: string;
  title: string;
  shortTitle?: string;
  slug: { current: string };
  image: any;
  createdBy?: string;
  date?: string;
  description: PortableTextBlock[];
}
