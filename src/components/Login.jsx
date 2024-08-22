import { Link, useNavigate } from 'react-router-dom';
import { useState, useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function Login(){

    const loggedInData=useContext(UserContext);
    
    const navigate=useNavigate();

    const [userCreds,setUserCreds]=useState({
        email: "",
        password: ""
    });

    const[message,setMessage]=useState({
        type: "invisible-msg",
        message: ""
    })

    function handleInput(event){
        setUserCreds((prevState)=>{
            return {...prevState,[event.target.name]:event.target.value}
        })
    }

    function handleSubmit(event){
        event.preventDefault();
        fetch("http://localhost:8080/login",{
            method: "POST",
            body: JSON.stringify(userCreds),
            headers:{
                "Content-Type": "application/json"
            }
        }).then((response)=>{
            if(response.status===404){
                setMessage({type: "error",text: "Username or email doesn't exist"});
            }
            else if(response.status===403){
                setMessage({type: "error",text: "Incorrect password"});
            }
            setTimeout(()=>{
                setMessage({type:"invisible-msg",message:""});
            },5000)
            
            return response.json();
        }).then((data)=>{
            if(data!==undefined && data.token!==undefined){
            localStorage.setItem("nutrify-user",JSON.stringify(data));
            loggedInData.setLoggedUser(data);
            navigate("/track");
            }
        }).catch((err)=>{
            console.log(err);
        })
    }


    return (
        <section className="container">
            <form action="" className="form">
                <h1>Login To Fitness</h1>
                <input className="inp" required type="email" placeholder="Enter Email" name="email" onChange={handleInput} value={userCreds.email}/>
                <input className="inp" required maxLength={8} type="password" placeholder="Enter Password" name="password" onChange={handleInput} value={userCreds.password} />
                <button className="btn" onClick={handleSubmit}>Login</button>

                <p>Don't have an account ? <Link to="/register">Register Now</Link></p>
                <p className={message.type}>{message.text}</p>
            </form>
        </section>
    )
}