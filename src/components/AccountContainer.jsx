import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions,setTransactions] = useState([])
  const [search,setSearch] = useState("")
  const [sortBy, setSortBy] = useState("description")

  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[])

  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    .then(data=>setTransactions([...transactions,data]))
  }
  
  function onSort(sortBy){
    setSortBy(sortBy)
  }

  // Keep search filtering case-insensitive so users can type naturally.
  const filteredTransactions = transactions.filter((transaction) => {
    const normalizedSearch = search.toLowerCase();

    return (
      transaction.description.toLowerCase().includes(normalizedSearch) ||
      transaction.category.toLowerCase().includes(normalizedSearch)
    );
  });

  // Sort the filtered results to keep behavior consistent with the selected sort option.
  const visibleTransactions = [...filteredTransactions].sort((a, b) => {
    return String(a[sortBy]).localeCompare(String(b[sortBy]));
  });
  

  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={visibleTransactions} />
    </div>
  );
}

export default AccountContainer;
