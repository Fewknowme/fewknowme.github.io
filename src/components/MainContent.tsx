import * as React from "react";
import AvatarGroup from "@mui/material/AvatarGroup";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled } from "@mui/material/styles";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import { useAbout } from "~/hooks/useAbout";
import { PortableText } from "@portabletext/react";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import PeerListIcon from "@mui/icons-material/People";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { JSX } from "react";
import { useProjects } from "~/hooks/useProjects";
import { urlFor } from "~/lib/imageBuilder";
import dayjs from "dayjs";
import { useTestimonial } from "~/hooks/useTestimonial";
import { Avatar, Link } from "@mui/material";

const iconMap: Record<string, JSX.Element> = {
  GitHubIcon: <GitHubIcon />,
  LinkedInIcon: <LinkedInIcon />,
  PeerList: <PeerListIcon />,
  MediumIcon: <NewspaperIcon />,
};

const SyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  padding: 0,
  height: "100%",
  backgroundColor: (theme.vars || theme).palette.background.paper,
  "&:hover": {
    backgroundColor: "transparent",
    cursor: "pointer",
  },
  "&:focus-visible": {
    outline: "3px solid",
    outlineColor: "hsla(210, 98%, 48%, 0.5)",
    outlineOffset: "2px",
  },
}));

const SyledCardContent = styled(CardContent)({
  display: "flex",
  flexDirection: "column",
  gap: 4,
  padding: 16,
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: 16,
  },
});

function Author({
  author,
  date,
}: {
  author: string | undefined;
  date: string | undefined;
}) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1,
          alignItems: "center",
        }}
      >
        <AvatarGroup max={3}></AvatarGroup>
        <Typography variant="caption">{author}</Typography>
      </Box>
      <Typography variant="caption">{date}</Typography>
    </Box>
  );
}

export function Search() {
  return (
    <FormControl sx={{ width: { xs: "100%", md: "25ch" } }} variant="outlined">
      <OutlinedInput
        size="small"
        id="search"
        placeholder="Search…"
        sx={{ flexGrow: 1 }}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "text.primary" }}>
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        }
        inputProps={{
          "aria-label": "search",
        }}
      />
    </FormControl>
  );
}

export default function MainContent() {
  const { data: aboutData } = useAbout();
  const { data: projectData } = useProjects();
  const { data: testimonialData } = useTestimonial();

  const [focusedCardIndex, setFocusedCardIndex] = React.useState<number | null>(
    null
  );

  const handleFocus = (index: number) => {
    setFocusedCardIndex(index);
  };

  const handleBlur = () => {
    setFocusedCardIndex(null);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <div>
        <Typography variant="h1" gutterBottom>
          Hey!
        </Typography>
        <Typography>Welcome to my Portfolio</Typography>
      </div>

      {aboutData && (
        <Grid container spacing={2} columns={12} sx={{ mb: 2 }}>
          {/* @ts-expect-error */}
          <Grid item xs={12}>
            <SyledCard variant="highlighted">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  gap: 3,
                  alignItems: { xs: "center", md: "center" },
                  px: 2,
                  py: 3,
                }}
              >
                {/* Profile Photo */}
                <Box
                  component="img"
                  src={aboutData.profilePhoto}
                  alt={aboutData.name}
                  sx={{
                    width: 400,
                    height: 200,
                    borderRadius: { xs: 4, md: 12 },
                    objectFit: "cover",
                    border: "2px solid",
                    borderColor: "divider",
                  }}
                />

                {/* Info Block */}
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h2" gutterBottom>
                    I am {aboutData.name}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <PortableText value={aboutData.description} />
                  </Box>
                  <Typography
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    sx={{ mb: 2, textDecoration: "underline" }}
                    variant="body1"
                    gutterBottom
                  >
                    Connect with me on:
                  </Typography>
                  {/* Social Links */}
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {aboutData.socialLinks?.map((link: any) => (
                      <IconButton
                        key={link.iconName}
                        component="a"
                        href={link.url}
                        target="_blank"
                        color="default"
                        rel="noopener noreferrer"
                      >
                        {iconMap[link.iconName]}
                      </IconButton>
                    ))}
                  </Box>
                </Box>
              </Box>
            </SyledCard>
          </Grid>
        </Grid>
      )}

      <div id="my-work">
        <Typography variant="h1" gutterBottom>
          My Work
        </Typography>
      </div>

      <Grid container spacing={2} columns={12}>
        {projectData &&
          projectData.map((project_item) => (
            <Grid size={{ xs: 12, md: 6 }}>
              <SyledCard
                variant="outlined"
                onFocus={() => handleFocus(0)}
                onBlur={handleBlur}
                tabIndex={0}
                className={focusedCardIndex === 0 ? "Mui-focused" : ""}
              >
                <CardMedia
                  component="img"
                  alt="project placeholder"
                  image={urlFor(project_item?.image).url()}
                  sx={{
                    objectFit: "contain",
                    aspectRatio: "16 / 9",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                />
                <SyledCardContent>
                  {/* <Typography gutterBottom variant="caption" component="div">
                    {cardData[0].tag}
                  </Typography> */}
                  <Typography gutterBottom variant="h6" component="div">
                    {project_item.title}
                  </Typography>
                  {/* <StyledTypography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                  >
                    {project_item.description}
                  </StyledTypography> */}
                </SyledCardContent>
                <Author
                  author={project_item.createdBy}
                  date={dayjs(project_item.date).format("MMM DD, YYYY")}
                />
              </SyledCard>
            </Grid>
          ))}
      </Grid>
      <div id="testimonials">
        <Typography variant="h1" gutterBottom>
          Testimonials
        </Typography>
      </div>
      <Box display="grid" gap={3}>
        {testimonialData?.map((t) => (
          <Card key={t._id}>
            <CardContent>
              <Box display="flex" alignItems="center" gap={2}>
                {t.profileImage && (
                  <Avatar
                    src={t.profileImage}
                    alt={t.name}
                    sx={{ width: 56, height: 56 }}
                  />
                )}
                <Box>
                  <Typography variant="h6">{t.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {t.jobTitle} {t.company && ` @ ${t.company}`}
                  </Typography>
                </Box>
              </Box>
              <Typography sx={{ mt: 2 }}>{t.testimonial}</Typography>
              {t.linkedinUrl && (
                <Link
                  href={t.linkedinUrl}
                  target="_blank"
                  rel="noopener"
                  sx={{ mt: 1, display: "inline-block" }}
                >
                  View LinkedIn Recommendation
                </Link>
              )}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
}
