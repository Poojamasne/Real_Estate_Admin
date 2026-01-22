// src/components/PropertyCategories.jsx
import { Box, Typography, Stack } from "@mui/material";
import PropertyCategoryCard from "../../components/cards/PropertyCategoryCard";

// images
import BuyImg from "../../assets/images/Buy.png";
import RentImg from "../../assets/images/Rent.png";
import CommercialImg from "../../assets/images/Commercial.png";

export default function PropertyCategories() {
  return (
    <Box
      sx={{
        width: "100%",
        py: 10,
        backgroundColor: "#ffffff",
      }}
    >
      {/* Heading */}
      <Stack spacing={2} alignItems="center" mb={8}>
        <Typography
          variant="h4"
          fontSize={35}
          sx={{ fontWeight: 500, color: "#1f2a44", fontFamily: "Montserrat" }}
        >
          Property Categories
        </Typography>

        <Typography
          variant="body1"
          fontSize={16}
          sx={{
            fontFamily: "Montserrat",
            color: "#6b7280",
            maxWidth: 820,
            textAlign: "center",
          }}
        >
          Explore properties tailored to your needs — whether you’re buying,
          renting, or investing in commercial spaces.
        </Typography>
      </Stack>

      {/* Cards */}
      <Stack
        direction="row"
        justifyContent="center"
        gap="166px" // matches figma spacing
      >
        <PropertyCategoryCard image={BuyImg} label="Buy" />
        <PropertyCategoryCard image={RentImg} label="Rent" />
        <PropertyCategoryCard image={CommercialImg} label="Commercial" />
      </Stack>
    </Box>
  );
}
