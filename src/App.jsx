import React, { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { API_ENDPOINT } from './constants/constants'
import { ITEMS_PER_PAGE } from './constants/constants'
import JobPosting from './JobPosting'
import { jobobj } from './constants/constants'

function App() {
  const [count, setCount] = useState(0)
  const [items, setItems] = useState([])
  const [itemIds, setItemIds] = useState(null)
  const [fetchDetail, setFetchDetail] = useState(false) // show load on load more button
  const [currentPage, setCurrentPage] = useState(0)
  const fetchItems = async(curpage)=>{
    setCurrentPage(curpage)
    setFetchDetail(true)
    let itemList = itemIds;
    if(itemList === null){
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`)
      itemList = await response.json()
      setItemIds(itemList)
    }
    let itemIdpage = itemList.slice(ITEMS_PER_PAGE*curpage,curpage*ITEMS_PER_PAGE+ITEMS_PER_PAGE);
    const itemIdforPage = await Promise.all(itemIdpage.map((item)=>(
      fetch(`${API_ENDPOINT}/item/${item}.json`).then(res=>res.json())
    )))
    setItems([...items,...itemIdforPage])
    setFetchDetail(false);
  }
  useEffect(()=>{
    if(currentPage===0){
      fetchItems(currentPage)
    }
  },[])
  return (
    <>
      <h1>Hacker New Job Board</h1>
      {items.length < 1 || itemIds==null ? <h1>...Loading</h1> : <div>
        <div className='items' role='list'>{items.map((item) => (<JobPosting {...item} />
        ))}</div>
        <button onClick={()=>fetchItems(currentPage+1)} disabled={fetchDetail}>{fetchDetail?"...Loading":"Load More Jobs"}</button>
      </div>}
    </>
  )
}

export default App
