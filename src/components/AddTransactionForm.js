import React, {useState} from "react";


function AddTransactionForm({transactions, onSubmission}) {
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: 0,
  });

  function handleFormChange (event) {
    const {name, value} = event.target
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }))  
  }
  //The new value input is added to the data on the DOM
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const addedTransaction = await addTransaction(formData);
      onSubmission(addedTransaction);
      setFormData({
        date: "",
        description: "",
        category: "",
        amount: 0,
      });
    } catch (error) {
      console.error('Error submitting transaction:', error);
    }
  };

  //This adds the input data to be sent to the server
  const addTransaction = async (newTransaction) => {
    const BASE_URL = "http://localhost:8001";
    try {
      const response = await fetch(`${BASE_URL}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTransaction),
      });
      if (!response.ok) {
        throw new Error('Failed to add transaction');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding transaction:', error);
      throw error;
    }
  };
  

  return (
    <div className="ui segment">
      <form className="ui form"  onSubmit={handleSubmit}>
        <div className="inline fields">
          <input value={formData.date} type="date" name="date" onChange={handleFormChange}/>
          <input value={formData.description} type="text" name="description" placeholder="Description" onChange={handleFormChange} />
          <input value={formData.category} type="text" name="category" placeholder="Category" onChange={handleFormChange}/>
          <input value={formData.amount} type="number" name="amount" placeholder="Amount" step="0.01" onChange={handleFormChange} />
        </div>
        <button className="ui button" type="submit">
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
