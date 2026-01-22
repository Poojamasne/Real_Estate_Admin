// src/components/FeaturedPropertyCard.jsx

import { Box, Stack, Typography, Button } from "@mui/material";

export default function FeaturedPropertyCard({
  image,
  title,
  location,
  type,
  area,
}) {
  return (
    <Stack
      sx={{
        maxWidth: 398,
        height: 451,
        backgroundColor: "#ffffff",
        borderRadius: "14px",
        border: "1px solid #B7B7B7",

        // ✅ IMPORTANT
        display: "flex",
        flexDirection: "column",

        // padding controls distance from border
        pt: 2,
        px: 3,
        pb: 3,
      }}
    >
      {/* Image */}
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: 206,
          objectFit: "cover",
          borderRadius: "11px",
          mb: 2,
        }}
      />

      {/* Content */}
      <Stack spacing={1}>
        <Typography fontWeight={400} fontSize="17px">
          {title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Location : {location}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Type ({type})
        </Typography>

        <Typography variant="body2" fontWeight={600}>
          Area ({area})
        </Typography>
      </Stack>

      {/* ✅ FLEX SPACER */}
      <Box sx={{ flexGrow: 1 }} />

      {/* CTA */}
      <Button
        variant="contained"
        fullWidth
        sx={{
          height: 44,
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          backgroundColor: "#9b5cff",
          "&:hover": {
            backgroundColor: "#8a4ef0",
          },
        }}
      >
        View Details
      </Button>
    </Stack>
  );
}
