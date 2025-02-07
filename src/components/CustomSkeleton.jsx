import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const CustomSkeleton = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          my: 5,
          width: "100%",
          height: "100%",
        }}
      >
        <div className="flex flex-col w-full h-full">
          <Skeleton
            variant="rectangular"
            width="100%"
            height="100%"
            sx={{ bgcolor: "#ffffff", borderRadius: "8px" }}
          />
          <Box sx={{ pt: 0.5 }}>
            <Skeleton sx={{ bgcolor: "#ffffff" }} />
            <Skeleton width="60%" sx={{ bgcolor: "#ffffff" }} />
          </Box>
        </div>
      </Box>
    </>
  );
};

export default CustomSkeleton;
