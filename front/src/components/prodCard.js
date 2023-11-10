import { useState } from "react"
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';

const ProdCard = ({prod, admin}) => {
    const [edit, setEdit] = useState(false)

    const [newName, setNewname] = useState(prod.name)
    const [newPrice, setNewPrice] = useState(prod.price)
    const [newfeat, setNewfeat] = useState(prod.newfeat)
    const [newRating, setRating] = useState(prod.rating)

    const auth = localStorage.getItem("auth")

    const updateProduct = async (e) => {
        e.preventDefault();

        if(auth) {
            const res = await fetch('/product-edit/' + prod._id, {
                method: 'PATCH',
                body: JSON.stringify({newName, newPrice, newfeat, newRating, auth}),
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            const json = await res.json()
            console.log(json);
            if(!res.ok) {
                alert(json.msg)
            }
        }
        else{
            alert("unauthenticated user")
        }
        window.location.reload()
    }
    const deleteProduct = async(e) => {
        e.preventDefault();
        
        if(auth) {
            const deleteCheck = await fetch('/delete-product/' + prod._id, {
                method: 'DELETE',
                headers: {
                    'Content-Type' : 'application/json'
                }
            })
            console.log('here');
            const json = await deleteCheck.json()
            if(!deleteCheck.ok) {
                return alert(json.msg)
            }
            alert('deleted successfully')
            window.location.reload()
        }
        else{
            alert("unauthenticated user")
        }
    }

    return(
        <div className="prodcard">
            <div className="cardbuttons">
                {admin? <button onClick={() => setEdit(!edit)} className="editbutton"><EditIcon/></button> : null}
                {admin? <button onClick={e => deleteProduct(e)} className="deletebutton"><DeleteOutlineIcon/></button> : null}
                {edit? <button onClick={updateProduct} className="doneedit"><DownloadDoneIcon/></button> : null}
            </div>
            <h2>{edit? <input type="text" value={newName} onChange={e => setNewname(e.target.value)}/> : prod.name}</h2>
            <h3>{edit? <input type="number" value={newPrice} onChange={e => setNewPrice(e.target.value)}/> : prod.price}</h3>
            <p>{prod.company}</p>
            <p>{edit? <input type="number" value={newRating} onChange={e => setRating(e.target.value)}/> : prod.rating}</p>
            <p>{prod.createdAt.slice(0, 10)}</p>
        </div>
    )
}

export default ProdCard