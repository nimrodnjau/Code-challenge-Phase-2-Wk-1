import React from "react";


function Transaction({ transaction, onDelete }) {
  const { id, date, description, category, amount } = transaction;
  
  //Handles delete functionality on the website
  const handleDelete = async () => {
    try {
      // Sending a DELETE request to delete the transaction with the specified ID
      const response = await fetch(`http://localhost:8001/transactions/${id}`, {
        method: "DELETE",
      });
      
      // Checks if the request was successful
      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      // Calls the onDelete callback to update the UI with the deleted transaction removed
      onDelete(id);
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

//Renders the data into the table
  return (
    <tr>
      <td>{date}</td>
      <td>{description}</td>
      <td>{category}</td>
      <td>{amount}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default Transaction;
