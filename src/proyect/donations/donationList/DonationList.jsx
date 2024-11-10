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
    <div className="my-donation-container">
      <h1>Lista de Donaciones</h1>
      <div className="my-donation-list">
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
