import { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Register(){

    const [userDetails,setUserDetails]=useState({
        name: "",
        email: "",
        password: "",
        age: ""
    });

    const [message,setMessage]=useState({
        type: "invisible-msg",
        text: ""
    })

    function handleInput(event){
        setUserDetails((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value}
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        fetch("http://localhost:8080/register",{
            method: "POST",
            body: JSON.stringify(userDetails),
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response)=>response.json()).then((data)=>{
            setMessage({
                type: "success",
                text: data.message})
            setUserDetails({
                name: "",
                email: "",
                password: "",
                age: ""
            })
            setTimeout(()=>{
                setMessage({
                    type: "invisible-msg",
                    text: ""
                })
            },5000)
        }).catch((err)=>{
            console.log(err);
        })
    }

    return (
        <section className="container">
            <form onSubmit={handleSubmit} className="form">
                <h1>Start Your Fitness</h1>
                <input className="inp" required type="text" placeholder="Enter Name" name="name" onChange={handleInput} value={userDetails.name} />
                <input className="inp" required type="email" placeholder="Enter Email" name="email" onChange={handleInput} value={userDetails.email} />
                <input className="inp" required type="password" maxLength={8} placeholder="Enter Password" name="password" onChange={handleInput} value={userDetails.password}/>
                <input className="inp" required type="number" min={12} max={100} placeholder="Enter Age" name="age" onChange={handleInput} value={userDetails.age} />

                <button className="btn">Join</button>

                <p>Already Registered ? <Link to="/login">Login</Link></p>

                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    )
}