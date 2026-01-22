// src/components/FeaturedProperties.jsx
import { Box, Stack, Typography } from "@mui/material";
import FeaturedPropertyCard from "../../components/cards/FeaturedPropertyCard";

// images
import Img1 from "../../assets/images/modern-2bhk.png";
import Img2 from "../../assets/images/premium-villa.png";
import Img3 from "../../assets/images/spacious-1bhk.png";

export default function FeaturedProperties() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        background:
          "linear-gradient(180deg, #DDE2FC 0%, #DADCF5 50%, #E4D7F5 100%)",
      }}
    >
      {/* Heading */}
      <Stack spacing={2} alignItems="center" mb={8}>
        <Typography variant="h4" fontWeight={500} color="#1f2a44" fontSize={36}>
          Featured Properties
        </Typography>

        <Typography
          variant="body1"
          color="#6b7280"
          textAlign="center"
          fontSize={16}
        >
          Explore some of the best properties available right now.
        </Typography>
      </Stack>

      {/* Cards */}
      <Stack direction="row" justifyContent="center" gap="58px">
        <FeaturedPropertyCard
          image={Img1}
          title="Modern 2 BHK Apartment"
          location="Baner, Pune"
          type="Apartment / Villa"
          area="1200 sq ft"
        />

        <FeaturedPropertyCard
          image={Img2}
          title="Premium 3 BHK Villa"
          location="Wakad, Pune"
          type="Villa"
          area="1800 sq ft"
        />

        <FeaturedPropertyCard
          image={Img3}
          title="Spacious 1 BHK Flat"
          location="Hinjewadi, Pune"
          type="Apartment"
          area="650 sq ft"
        />
      </Stack>
    </Box>
  );
}
