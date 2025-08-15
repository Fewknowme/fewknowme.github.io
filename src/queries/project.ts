const projectsQuery = `
  *[_type == "project"] | order(date desc) {
    _id,
    title,
    shortTitle,
    slug,
    image,
    createdBy,
    date,
    description
  }
`;
export { projectsQuery };
