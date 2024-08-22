import { useEffect, useState, useContext} from "react";
import { UserContext } from "../contexts/UserContext";
import Header from './Header';

export default function Diet() {

    let loggedData = useContext(UserContext);

    let [items, setItems] = useState([]);

    const [date,setDate]=useState(new Date());

    let [total, setTotal] = useState({
        totalCalories: 0,
        totalProtein: 0,
        totalFat: 0,
        totalFiber: 0,
        totalCarbohydrates: 0
    });

    useEffect(() => {
        fetch(`http://localhost:8080/track/${loggedData.loggedUser.userid}/${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                setItems(data);
            }).catch((err) => {
                console.log(err);
            })
    }, [date])

    useEffect(()=>{
        calculateTotal();   
    },[items])
    
    function calculateTotal() {
        let totalCopy = {
            totalCalories:0,
            totalProtein:0,
            totalCarbohydrates:0,
            totalFat:0,
            totalFiber:0
        };
        if(items.message===undefined){
        items.forEach((item) => {
            totalCopy.totalCalories += item.details.calories;
            totalCopy.totalCarbohydrates += item.details.carbohydrates;
            totalCopy.totalFat += item.details.fat;
            totalCopy.totalFiber += item.details.fiber;
            totalCopy.totalProtein += item.details.protein;
        })
        setTotal(totalCopy);
        }
    }

    return (
        <>
        <Header/>
        <section className="container diet-container">

            <input type="date" onChange={(event)=>{
                setDate(new Date(event.target.value));
            }}/>

            {
                items.message===undefined?
                items.map((item) => {
                    return (
                        <div className="diet-item" key={item.id}>
                            <h2>{item.food.name} {item.details.calories} KCal for {item.quantity} g</h2>
                            <p>Protein: {item.details.protein} g</p>
                            <p>Carbohydrates: {item.details.carbohydrates} g</p>
                            <p>Fat: {item.details.fat} g</p>
                            <p>Fiber: {item.details.fiber} g</p>
                        </div>
                    )
                }):
                (<h2>Food was not tracked by the user for the given date</h2>)
            }

            {
                items.message==undefined?
                (<div className="item total-nutrients">
                <h1>Total Nutritions for the Day</h1>
                <h2>{total.totalCalories.toFixed(2)} KCal</h2>
                <p>Protein: {parseFloat(total.totalProtein).toFixed(2)} g</p>
                <p>Carbohydrates: {parseFloat(total.totalCarbohydrates).toFixed(2)} g</p>
                <p>Fat: {parseFloat(total.totalFat).toFixed(2)} g</p>
                <p>Fiber: {parseFloat(total.totalFiber).toFixed(2)} g</p>
             </div>):""
            }

        </section>
        </>
    )
}