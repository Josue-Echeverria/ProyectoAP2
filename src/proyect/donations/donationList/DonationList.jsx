import React from "react";
import DonationItem from "../donationItem/DonationItem";
import "./DonationList.css";

const DonationList = () => {
  const donations = [
    { id: 1, donor: "Carlos López", amount: 50.0, project: "Proyecto A" },
    { id: 2, donor: "Ana García", amount: 75.5, project: "Proyecto B" },
    { id: 3, donor: "Luis Pérez", amount: 20.0, project: "Proyecto C" },
    { id: 4, donor: "Sofía Torres", amount: 100.0, project: "Proyecto A" },
    { id: 5, donor: "Miguel Sánchez", amount: 45.0, project: "Proyecto D" },
  ];

  return (
    <div className="donation-list-container">
      <h2>Lista de Donaciones</h2>
      <div className="donation-list">
        {donations.map((donation) => (
          <DonationItem key={donation.id} donation={donation} />
        ))}
      </div>
    </div>
  );
};

export default DonationList;
