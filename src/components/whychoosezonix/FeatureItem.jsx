// src/components/WhyChooseZonix/FeatureItem.jsx
import { Stack, Typography, Box } from "@mui/material";

export default function FeatureItem({ icon, title, subtitle, description }) {
  return (
    <Stack spacing={1.5} alignItems="center" textAlign="center">
      <Box
        sx={{
          width: 56,
          height: 56,
          borderRadius: "50%",
          bgcolor: "#9b5cff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </Box>

      <Typography fontWeight={600} fontSize={24}>
        {title}
      </Typography>

      <Typography variant="body2" color="text.secondary" fontSize={18}>
        {subtitle}
      </Typography>

      <Typography variant="body2" color="#000000" maxWidth={260} fontSize={18}>
        {description}
      </Typography>
    </Stack>
  );
}
