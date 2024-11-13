import React, { useEffect } from "react";
import DonationItem from "../donationItem/DonationItem";
import "./DonationList.css";
import { getDonations, getAllDonations } from "../../../api/api";

const DonationList = ({adminView}) => {
  const [donations, setDonations] = React.useState([]); // Initialize the state with an empty array
  const currentUser = localStorage.getItem("username");
  const fetchDonations = async () => { // Keep this function async
    try {
        if(adminView){
            const donationsData = await getAllDonations(); // Fetch the donations
            setDonations(donationsData); // Set the donations in the state
            return;
        }
        const donationsData = await getDonations(currentUser); // Fetch the donations
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
