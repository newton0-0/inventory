import { useState } from "react"

const NewProd = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(null)
    const [featured, setFeat] = useState(false)
    const [rating, setRating] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const company = localStorage.getItem("company")
        const auth = localStorage.getItem("auth")
        console.log(auth);
        const data = { name, price, featured, rating, company, auth }
        
        if(auth) {
            if(name) {
                if(price) {
                        if(rating && rating>=0 && rating<=10) {
                            const res = await fetch('/new-product', {
                                method: 'POST',
                                body: JSON.stringify(data),
                                headers: {
                                    'Content-Type' : 'application/json'
                                }
                            })
                            console.log(res)
                            const json = await res.json()

                            if(!res.ok) {
                                alert(json.msg)
                            }

                            window.location.reload()
                        }
                        else{
                        alert('valid rating input ranges from 1 to 10')}
                    }
                else{
                alert('type the price of product')}
            }
            else{
            alert('type in a name of product')}
        }
        else{
            alert("unauthenticated user")
            window.location.reload()
        }
    }

    return(
        <div className="newprod">
            <h3>Add Product</h3>
            <div className="newprodform">
                <input type="text" value={name} placeholder="product name" onChange={e => setName(e.target.value)}/>
                <input type="number" value={price} placeholder="product price" onChange={e => setPrice(e.target.value)}/>
                <input type="number" value={rating} placeholder="rating of product" onChange={e => setRating(e.target.value)} min={1} max={10}/>
                <button onClick={(e) => {
                    e.preventDefault()
                    setFeat(!featured)
                    }}>{featured? "remove featuring" : "feature"}</button>

                <button onClick={(e) => {
                    handleSubmit(e)
                    }}>post product</button>
            </div>
        </div>
    )
}

export default NewProd;