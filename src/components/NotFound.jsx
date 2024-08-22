import { Link } from 'react-router-dom';
import Login from './Login';
export default function Register(){
    return (
        <section className='container'>
            <div className='not-found'>
            <h1> 404 | Not Found</h1>
            <p><Link to="/">Go Back to Login page</Link></p>
        </div>
        </section>
    )
}