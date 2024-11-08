import React from "react";
import "./DonationItem.css";

const DonationItem = ({ donation }) => {
  return (
    <div className="donation-item">
      <div className="donation-item-info">
        <span className="donor-name">{donation.nameDonator}</span>
        <span className="donation-amount">${donation.amount.toFixed(2)}</span>
        <span className="project-name">{donation.project}</span>
      </div>
      <span className="donation-date">{donation.date}</span>
    </div>
  );
};

export default DonationItem;
