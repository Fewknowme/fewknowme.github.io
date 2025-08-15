const aboutQuery = `*[_type == "about"][0] {
  name,
  description,
  "profilePhoto": profilePhoto.asset->url,
  socialLinks
}`;

export { aboutQuery };
