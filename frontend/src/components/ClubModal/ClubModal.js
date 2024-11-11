import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Avatar,
  useMediaQuery,
  Slide
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";

const ClubModal = ({ club, isOpen, onRequestClose }) => {
  const [animateOpen, setAnimateOpen] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const handleReadMore = () => {
    navigate(`/${club.name.replace(/\s+/g, "-").toLowerCase()}`);
  };

  useEffect(() => {
    if (isOpen) {
      setAnimateOpen(true);
    } else {
      setAnimateOpen(false);
    }
  }, [isOpen]);

  if (!isOpen && !animateOpen) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onRequestClose}
      maxWidth="xs"
      fullWidth
      TransitionComponent={Slide}
      TransitionProps={{
        direction: "up",
        timeout: 350,
      }}
      PaperProps={{
        sx: {
          borderRadius: "18px",
          boxShadow: "0 15px 30px rgba(0, 0, 0, 0.3)",
          padding: isSmallScreen ? "18px" : "36px",
          background: `linear-gradient(135deg, ${theme.palette.background.paper} 30%, ${theme.palette.background.default} 100%)`,
          transform: animateOpen ? "scale(1.03)" : "scale(1)",
          transition: "transform 0.3s ease",
          "&:hover": {
            transform: "scale(1.05)",
          },
        },
      }}
    >
      <Box sx={{ position: "absolute", top: 8, right: 8 }}>
        <IconButton onClick={onRequestClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </Box>
      
      <DialogTitle>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src={club.clubLogo}
            alt={`${club.name} logo`}
            sx={{
              width: isSmallScreen ? 70 : 110,
              height: isSmallScreen ? 70 : 110,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.15)",
              transition: "transform 0.3s ease",
              filter: "drop-shadow(0 0 10px rgba(0, 0, 0, 0.2))",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
          <Typography
            variant={isSmallScreen ? "h6" : "h5"}
            mt={2}
            fontWeight="bold"
            color={theme.palette.primary.main}
            sx={{
              letterSpacing: "0.05em",
              transition: "color 0.3s ease",
              "&:hover": {
                color: theme.palette.primary.dark,
              },
            }}
          >
            {club.name}
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent>
        <Typography
          variant="body2"
          color="textSecondary"
          textAlign="center"
          sx={{
            fontSize: isSmallScreen ? "0.9rem" : "1rem",
            lineHeight: 1.6,
            letterSpacing: "0.03em",
            color: theme.palette.text.secondary,
          }}
        >
          {club.chapterBrief
            ? club.chapterBrief.length > 100
              ? `${club.chapterBrief.slice(0, 100)}...`
              : club.chapterBrief
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum."}
        </Typography>
      </DialogContent>

      <Box sx={{ my: 2 }}>
        <hr style={{ border: "0.5px solid #ddd", margin: "10px 0" }} />
      </Box>

      <DialogActions sx={{ justifyContent: "center", paddingBottom: isSmallScreen ? 2 : 3 }}>
        <Button
          variant="contained"
          color="primary"
          fullWidth={isSmallScreen}
          onClick={handleReadMore}
          sx={{
            padding: isSmallScreen ? "10px" : "12px 24px",
            boxShadow: "0 3px 6px rgba(0, 123, 255, 0.3)",
            fontSize: "1rem",
            textTransform: "capitalize",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            "&:hover": {
              backgroundColor: theme.palette.primary.dark,
              boxShadow: "0 6px 12px rgba(0, 123, 255, 0.4)",
              transform: "translateY(-2px) scale(1.05)",
            },
          }}
        >
          Read More
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ClubModal;