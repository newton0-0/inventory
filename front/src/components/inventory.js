import React, { useEffect, useState } from "react"
import NewProd from "./newProd"
import ProdCard from "./prodCard"

import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Inventory = () => {
    const [products, setProds] = useState([])
    const [filtered, setFiltered] = useState(products)
    const [anyfilter, setAny] = useState(false)
    const [addProd, setAdd] = useState(false)

    const [rating, setRating] = useState(0)
    const [minPrice, setMinPrice] = useState(0)
    const user = localStorage.getItem("company")

    const fetchData = async () => {
        const data = await fetch('/inventory', { method : 'GET' })
        const json = await data.json()
        if(!data.ok) {
            return alert(data.msg)
        }
        setProds(json)
        setFiltered(json)
        console.log(json);
    }

    const doFilter = (e) => {
        e.preventDefault()

        const filteredProducts = products.filter(product =>
            (rating === 0 || product.rating > rating) && (minPrice === 0 || product.price < minPrice))
        setFiltered(filteredProducts);
        setAny(true)
        console.log(filtered);
    }

    useEffect(() => {
        fetchData()
    },[])

    return(
        <div className="inventory">
            <div className="inventorynav">
                <h1>Hello, {localStorage.getItem("company")}</h1>
                <button onClick={() => {
                    localStorage.removeItem("company")
                    localStorage.removeItem("auth")
                    window.location.reload()
                }}
                className="logoutbutton"
                ><ExitToAppIcon/></button>
            </div>
            <div className="userbar">
            <div className="filterbar">
                <h3>Filter</h3>
                <div className="minimumrating">
                    <label><b>minimum rating</b></label>
                    <select
                        value={rating}
                        className="filterbarinput"
                        onChange={(e) => setRating(parseInt(e.target.value))}
                    >
                        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                        ))}
                    </select>
                </div>
                <div className="maximumprice">
                    <label><b>maximum price</b></label>
                    <input
                        type="number" 
                        placeholder="type minimum price"
                        value={minPrice} 
                        className="filterbarinput"
                        onChange={e => setMinPrice(parseInt(e.target.value, 10))}
                    />
                </div>
                <button onClick={e => doFilter(e)} className="filtersubmit">filter</button>
            </div>
            <div className="inventorybuttons">
                <button onClick={() => setAdd(!addProd)} className="addProductButton">add product</button>
                {addProd? <NewProd/> : null}
            </div>
            </div>
            {!anyfilter && <div className="featurechart">
                <h1>Featured Products</h1>
                <div className="featuredproducts">
                    {products && Array.from(products).map(product => {
                        if(product.featured) {
                            return <ProdCard prod={product} admin={(user === product.company)} key={product._id}/>
                        }
                    })}
                </div>
            </div>
            }
                <h1>{!anyfilter? "All Products" : "Filtered Products"}</h1>
                <div className="inventoryprods">
                    {products && Array.from(filtered).map(product => {
                        return <ProdCard prod={product} admin={(user === product.company)} key={product._id}/>
                    })
                    }
                </div>
            </div>
    )
}

export default Inventory