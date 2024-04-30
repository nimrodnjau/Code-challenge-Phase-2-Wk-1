import React, {useState} from "react";


function Search({transactions, onSearch}) {
  const [searchValue, setSearchValue] = useState("");
  //
  const handleSearch = (e) => {
    const character = e.target.value
    setSearchValue(character);
    const filteredTransactions = transactions.filter(transaction =>
      transaction.description.toLowerCase().includes(character.toLowerCase())
    );
    // Pass the filtered transactions to the parent component
    onSearch(filteredTransactions);
  };



  return (
    <div className="ui large fluid icon input">
      <input
        type="text"
        placeholder="Search your Recent Transactions"
        value={searchValue}
        onChange={handleSearch}
      />
      <i className="circular search link icon"></i>
    </div>
  );
}

export default Search;
