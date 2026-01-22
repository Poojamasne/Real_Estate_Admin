// src/components/WhyChooseZonix/WhyChooseZonix.jsx
import { Container, Grid, Stack, Typography, Box } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import SearchIcon from "@mui/icons-material/Search";
import ShieldIcon from "@mui/icons-material/Security";
import HelpIcon from "@mui/icons-material/HelpOutline";

import FeatureItem from "../../components/whychoosezonix/FeatureItem";
import CentralVisual from "../../components/whychoosezonix/CentralVisual";

export default function WhyChooseZonix() {
  return (
    <Box sx={{ bgcolor: "#ffffff", py: 12 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Stack spacing={1.5} alignItems="center" mb={1}>
          <Typography
            variant="h4"
            fontWeight={500}
            fontSize={36}
            color="#24364E"
          >
            Why Choose Zonix Realty ?
          </Typography>

          <Typography
            variant="subtitle2"
            color="text.secondary"
            fontWeight={500}
            fontSize={16}
          >
            Professional, Trusted, Transparent.
          </Typography>

          <Typography
            variant="body2"
            align="center"
            maxWidth={800}
            color="text.secondary"
            fontWeight={500}
            fontSize={16}
          >
            We make property discovery simple, transparent, and reliable with
            verified listings and expert support.
          </Typography>
        </Stack>

        {/* Arc */}
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: 140, // layout height (small)
            overflow: "", // hides extra SVG
            mt: 14,
          }}
        >
          <svg
            width="100%"
            height="400" // visual height (big)
            viewBox="0 0 1312 400"
            preserveAspectRatio="none"
            style={{
              position: "absolute",
              bottom: 0, // anchor curve bottom
              left: 0,
            }}
          >
            <path
              d="M0,350 Q656,50 1312,350"
              fill="none"
              stroke="#444444"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>
        </Box>

        {/* Main layout */}
        <Grid container alignItems="center" sx={{ mt: -16 }}>
          {/* Left */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={35}>
              <FeatureItem
                icon={<VerifiedIcon sx={{ color: "#fff" }} />}
                title="Verified Listings"
                subtitle="Genuine Properties"
                description="All listings are verified to ensure quality and authenticity."
              />

              <FeatureItem
                icon={<ShieldIcon sx={{ color: "#fff" }} />}
                title="Trusted Agents"
                subtitle="Expert Guidance"
                description="Experienced agents assist you at every step of your property journey."
              />
            </Stack>
          </Grid>

          {/* Center */}
          <Grid size={{ xs: 12, md: 6 }}>
            <CentralVisual />
          </Grid>

          {/* Right */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Stack spacing={35}>
              <FeatureItem
                icon={<SearchIcon sx={{ color: "#fff" }} />}
                title="Easy Search"
                subtitle="Smart Filters"
                description="Quickly find properties by location, type, budget, and size."
              />

              <FeatureItem
                icon={<HelpIcon sx={{ color: "#fff" }} />}
                title="Quick Inquiry"
                subtitle="Instant Connection"
                description="Reach out to property experts easily with our simple inquiry system."
              />
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom */}
        {/* Bottom */}
        <Box sx={{ mt: -12 }}>
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="center"
            spacing={2}
          >
            <svg width="533" height="88" viewBox="0 0 533 88" fill="none">
              <path
                d="
      M1 1
      V73
      Q1 87 15 87
      H532
    "
                stroke="#444444"
                strokeWidth="1"
              />
            </svg>

            {/* Text */}
            <Typography color="text.secondary" fontSize={18} fontWeight={500}>
              Explore
            </Typography>

            {/* Right curved line */}
            <svg width="533" height="88" viewBox="0 0 533 88" fill="none">
              <path
                d="
      M532 1
      V73
      Q532 87 518 87
      H1
    "
                stroke="#444444"
                strokeWidth="1"
              />
            </svg>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
