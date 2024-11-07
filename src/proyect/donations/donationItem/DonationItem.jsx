import React from "react";
import "./DonationItem.css";

const DonationItem = ({ donation }) => {
  return (
    <div className="donation-item">
      <span className="donor-name">{donation.donor}</span>
      <span className="donation-amount">${donation.amount.toFixed(2)}</span>
      <span className="project-name">{donation.project}</span>
    </div>
  );
};

export default DonationItem;
