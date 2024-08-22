import { useContext, useState, useRef } from 'react';
import {UserContext} from '../contexts/UserContext';
import Food from './Food';
import Header from './Header';

export default function Track() {

    let loggedUserTrack=useContext(UserContext);

    const [foodItems,setFoodItems]=useState([]);
    const searchRef = useRef(null);
    const [food,setFood]=useState(null);

    function searchFood(event){
        if(event.target.value!==""){
        fetch(`http://localhost:8080/foods/${event.target.value}`,{
            method: "GET",
            headers:{
                'Authorization': `Bearer ${loggedUserTrack.loggedUser.token}`,
            }
        }).then((response)=>response.json())
        .then((data)=>{
            setFoodItems(data);
        }).catch((err)=>{
            console.log(err);
        })
        }
        else{
            setFoodItems([]);
        }
    }

    return (
        <>
        <Header />
            <section className="container track-container">
                <div className="search">
                    <input ref={searchRef} onChange={searchFood} className="search-inp" type="search" placeholder="Search Food Item By Name"/>
                    {
                        foodItems.length !=0?(
                            <div className="search-results">
                            {foodItems.map((foodItem)=>{
                                return (
                                   <p className='item search-item' key={foodItem.id} onClick={()=>{
                                        setFood(foodItem);
                                        setFoodItems([]);
                                        searchRef.current.value = "";
                                    }
                                   }>{foodItem.name}</p>
                                )
                            })}
                        </div>
                        ):null
                    }
                </div>

                    {
                        food!==null?<Food foodData={food} />:""
                    }
            </section>
        </>
    )
}