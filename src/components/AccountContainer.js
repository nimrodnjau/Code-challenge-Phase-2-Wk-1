import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer() {
  
//This fetches data from the server and assigns the data to a variable
  const [transactions, setTransactions] = useState([])
    useEffect(()=>{
      fetch('https://code-challenge-phase-2-wk-1-2.onrender.com/transactions')
        .then((response) => response.json())
        .then((data) => {
         setTransactions(data)
         setFilteredTransactions(data)
        } );
    }, [])


    const handleSubmission = (newTransaction) => {
    // Create a new transaction object with all necessary properties
    const transactionToAdd = {
      id: newTransaction.id,
      date: newTransaction.date,
      description: newTransaction.description,
      category: newTransaction.category,
      amount: newTransaction.amount
    };
      // Updates the transactions state with the new transaction
      setTransactions([...transactions, newTransaction]);
      setFilteredTransactions([...filteredTransactions, transactionToAdd ])
    };


    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const handleSearch = (filteredTransactions) => {
      setFilteredTransactions(filteredTransactions);
      // Update the state or perform any other logic based on the filtered transactions
    };



    const handleDelete = (id) => {
      // Removes the deleted transaction from transactions state
      const updatedTransactions = transactions.filter(transaction => transaction.id !== id);
      setTransactions(updatedTransactions);
      // Removes the deleted transaction from filteredTransactions state
      const updatedFilteredTransactions = filteredTransactions.filter(transaction => transaction.id !== id);
      setFilteredTransactions(updatedFilteredTransactions);
    };
 
  return (
    <div>
      <Search transactions={transactions} onSearch={handleSearch}/>
      <AddTransactionForm transactions={transactions} onSubmission={handleSubmission}/>
      <TransactionsList  transactions={filteredTransactions} onDelete={handleDelete}/>
    </div>
  );
}

export default AccountContainer;
