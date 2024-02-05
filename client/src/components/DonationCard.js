import "./DonationCard.css";
import PropTypes from "prop-types";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";

const Donation = ({ cardDetails }) => {
  function LinearProgressWithLabel(props) {
    return (
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box sx={{ width: "100%", mr: 1 }}>
          <LinearProgress variant="determinate" {...props} />
        </Box>
        <Box sx={{ minWidth: 35 }}>
          <Typography variant="body2" color="text.secondary">{`${Math.round(
            props.value
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }

  LinearProgressWithLabel.propTypes = {
    value: PropTypes.number.isRequired,
  };

  const [progress, setProgress] = useState(0);
  const [gathered, setGathered] = useState(0);

  const handlePayNowClick = () => {
    setProgress((prevProgress) => prevProgress + 10);
    setGathered((prevGathered) => prevGathered + 100000);
  };

  return (
    <div className="cards-container">
      <div className="card">
        <div className="card-image">
          <img
            src={cardDetails?.image}
            alt="masjid_Image"
            width={400}
            height={300}
          />
        </div>
        <div className="card-details">
          <p className="name">{cardDetails?.name}</p>
          <p className="description">{cardDetails?.description}</p>
          <Box sx={{ width: "100%" }}>
            <Typography variant="p" fontSize="18px" color="initial">
              Required : {cardDetails?.price}
            </Typography>
            <br />
            <Typography variant="p" fontSize="18px" color="initial">
              Gathered : {gathered}
            </Typography>
            <LinearProgressWithLabel value={progress} />
            <button onClick={handlePayNowClick}>Pay Now</button>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default Donation;
