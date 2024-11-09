import React, { useEffect } from "react";
import DonationItem from "../donationItem/DonationItem";
import "./DonationList.css";
import { getAllDonations } from "../../../api/api";

const DonationList = () => {
  const [donations, setDonations] = React.useState([]); // Initialize the state with an empty array

  const fetchDonations = async () => { // Keep this function async
    try {
        const donationsData = await getAllDonations(); // Fetch the donations
        setDonations(donationsData); // Set the donations in the state
    } catch (error) {
        console.error('Error in fetchDonations:', error);
    }
  };

  useEffect(() => {
    fetchDonations(); // Call the fetch function on component mount
  }, []); // Run once on mount

  return (
    <div className="donation-container">
      <h2>Lista de Donaciones</h2>
      <div className="donation-list">
        {donations.length === 0 ? (<p>Cargando...</p>) : (
          donations.map((donation) => (
            <DonationItem key={donation.id} donation={donation} />
          ))
        )}
      </div>
    </div>
  );
};

export default DonationList;
