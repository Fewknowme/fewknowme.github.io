const testimonialQuery = `
    *[_type == "testimonial"]{
      _id,
      name,
      jobTitle,
      company,
      "profileImage": profileImage.asset->url,
      testimonial,
      linkedinUrl
    }
  `;
export { testimonialQuery };
