import { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import PropTypes from "prop-types";

export default function Food(props) {

    const [grams, setGrams] = useState(100);
    const [food, setFood] = useState({});
    const [message, setMessage] = useState({
        type: "invisible-msg",
        text: ""
    })

    let loggedData = useContext(UserContext);

    useEffect(() => {
        setFood(props.foodData);
    }, [props.foodData])

    function calculateMacros(event) {
        let quantity = Number(event.target.value);
        if (quantity != 0) {
            let foodCopy = { ...props.foodData };
            foodCopy.calories = (quantity * foodCopy.calories) / 100;
            foodCopy.protein = (quantity * foodCopy.protein) / 100;
            foodCopy.fiber = (quantity * foodCopy.fiber) / 100;
            foodCopy.fat = (quantity * foodCopy.fat) / 100;
            foodCopy.carbohydrates = (quantity * foodCopy.carbohydrates) / 100;
            setFood(foodCopy);
            setGrams(quantity);
        }
        else {
            setGrams(100);
            setFood(props.foodData);
        }
    }

    function trackFoodItem() {
        let track = {
            user_id: loggedData.loggedUser.userid,
            food_id: food.id,
            quantity: grams,
            details: {
                calories: food.calories,
                protein: food.protein,
                fat: food.fat,
                fiber: food.fiber,
                carbohydrates: food.carbohydrates
            }
        }

        fetch("http://localhost:8080/track", {
            method: "POST",
            body: JSON.stringify(track),
            headers: {
                "Authorization": `Bearer ${loggedData.loggedUser.token}`,
                "Content-Type": "application/json"
            }
        }).then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessage({
                    type: "success",
                    text: data.message
                });
                setTimeout(() => {
                    setMessage({
                        type: "invisible-msg",
                        text: ""
                    })
                }, 5000)
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="food">
            <img className="food-img" src={food.imagePath} alt={food.name} />
            <h3 className='food-title'>{food.name} ({food.calories} Kcal for {grams} g)</h3>
            <div className="nutrient-parent">
                <div className="nutrient">
                    <p className="n-title">Protein</p>
                    <p className='n-value'>{food.protein} g</p>
                </div>
                <div className="nutrient">
                    <p className="n-title">Carbs</p>
                    <p className='n-value'>{food.carbohydrates} g</p>
                </div>
                <div className="nutrient">
                    <p className="n-title">Fat</p>
                    <p className='n-value'>{food.fat} g</p>
                </div>
                <div className="nutrient">
                    <p className="n-title">Fiber</p>
                    <p className='n-value'>{food.fiber} g</p>
                </div>
            </div>

            <div className="track-control">
                <input onChange={calculateMacros} type="number" className='inp' placeholder='Quantity in grams' />
                <button className='btn' onClick={trackFoodItem}>Track</button>
            </div>

            <p className={message.type}>{message.text}</p>
        </div>
    )
}

Food.propTypes = {
    foodData: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        calories: PropTypes.number.isRequired,
        protein: PropTypes.string.isRequired,
        fat: PropTypes.string.isRequired,
        fiber: PropTypes.string.isRequired,
        carbohydrates: PropTypes.string.isRequired,
        imagePath: PropTypes.string
    }).isRequired
};