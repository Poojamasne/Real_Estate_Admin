// src/components/Testimonials/TestimonialCard.jsx
import { Box, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function TestimonialCard({
  avatar,
  text,
  name,
  role,
  rating = 4,
}) {
  return (
    <Box
      sx={{
        height: 334,
        maxWidth: 587,
        bgcolor: "#ffffff",
        borderRadius: "16px",
        px: 4,
        pt: 6,
        pb: 3,
        position: "relative",
      }}
    >
      {/* Avatar */}
      <Box
        component="img"
        src={avatar}
        alt={name}
        sx={{
          width: 64,
          height: 64,
          borderRadius: "50%",
          objectFit: "cover",
          position: "absolute",
          top: -32,
          left: 32,
          border: "4px solid #ffffff",
        }}
      />

      <Stack spacing={3}>
        {/* Testimonial text */}
        <Typography variant="body2" color="text.secondary">
          “{text}”
        </Typography>

        {/* Footer */}
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Stack spacing={0.5}>
            <Typography fontWeight={500}>{name}</Typography>
            <Typography variant="caption" color="text.secondary">
              {role}
            </Typography>
          </Stack>

          {/* Stars */}
          <Stack direction="row" spacing={0.5}>
            {Array.from({ length: rating }).map((_, i) => (
              <StarIcon key={i} sx={{ fontSize: 18, color: "#F5A623" }} />
            ))}
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
}
