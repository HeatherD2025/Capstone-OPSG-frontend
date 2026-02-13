import React, { useContext } from "react";

export default function invoicePopulation(balance) {
  
  // helper function for min max random number generation
  function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

// keep max balance - 1 so it stays within the right range
const firstItem = getRandom(100, balance - 1);
const secondItem = getRandom(250, balance - firstItem);
const thirdItem = balance - firstItem - secondItem;

return { firstItem, secondItem, thirdItem }



}
// use js to take the global balance provider and create three unique 
// 'item costs' that add up to the balance created and stored for use on the invoice

