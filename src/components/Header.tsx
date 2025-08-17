import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ColorModeIconDropdown from "../shared-theme/ColorModeIconDropdown";

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  flexShrink: 0,
  borderRadius: `calc(${theme.shape.borderRadius}px + 8px)`,
  backdropFilter: "blur(24px)",
  border: "1px solid",
  borderColor: (theme.vars || theme).palette.divider,
  backgroundColor: theme.vars
    ? `rgba(${theme.vars.palette.background.defaultChannel} / 0.4)`
    : alpha(theme.palette.background.default, 0.4),
  boxShadow: (theme.vars || theme).shadows[1],
  padding: "8px 12px",
}));

export default function AppAppBar() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <AppBar
      position="fixed"
      enableColorOnDark
      sx={{
        boxShadow: 0,
        bgcolor: "transparent",
        backgroundImage: "none",
        mt: "calc(var(--template-frame-height, 0px) + 28px)",
      }}
    >
      <Container maxWidth="lg">
        <StyledToolbar variant="dense" disableGutters>
          <Box
            sx={{ flexGrow: 1, display: "flex", alignItems: "center", px: 0 }}
          >
            {/* Desktop buttons */}
            <Box sx={{ display: { xs: "none", md: "flex" } }}>
              <Button
                onClick={() => window.scrollTo(0, 0)}
                variant="text"
                color="info"
                size="small"
              >
                Home
              </Button>
              <Button href="#my-work" variant="text" color="info" size="small">
                My Work
              </Button>
              <Button
                href="#testimonials"
                variant="text"
                color="info"
                size="small"
                sx={{ minWidth: 0 }}
              >
                Testimonials
              </Button>
            </Box>
          </Box>

          {/* Desktop right section */}
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 1,
              alignItems: "center",
            }}
          >
            <ColorModeIconDropdown />
          </Box>

          {/* Mobile section */}
          <Box sx={{ display: { xs: "flex", md: "none" }, gap: 1 }}>
            <ColorModeIconDropdown size="medium" />
            <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="top"
              open={open}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  top: "var(--template-frame-height, 0px)",
                },
              }}
            >
              <Box sx={{ p: 2, backgroundColor: "background.default" }}>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton onClick={toggleDrawer(false)}>
                    <CloseRoundedIcon />
                  </IconButton>
                </Box>

                {/* Mobile buttons, same as web */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                  <Button
                    onClick={() => {
                      window.scrollTo(0, 0);
                      setOpen(false);
                    }}
                    variant="text"
                    color="info"
                    size="small"
                  >
                    Home
                  </Button>
                  <Button
                    href="#my-work"
                    onClick={() => setOpen(false)}
                    variant="text"
                    color="info"
                    size="small"
                  >
                    My Work
                  </Button>
                  <Button
                    href="#testimonials"
                    onClick={() => setOpen(false)}
                    variant="text"
                    color="info"
                    size="small"
                  >
                    Testimonials
                  </Button>
                  {/* <Button
                    href="#blogs"
                    onClick={() => setOpen(false)}
                    variant="text"
                    color="info"
                    size="small"
                  >
                    Blogs
                  </Button> */}
                </Box>
              </Box>
            </Drawer>
          </Box>
        </StyledToolbar>
      </Container>
    </AppBar>
  );
}
