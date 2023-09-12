import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { useNavigate  } from "react-router-dom";

export const Login = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    
    const navigate = useNavigate()
    function submitRequest() {
        const obj = {
            email: email,
            password: password
        }
        actions.getUserToken(obj).then(() => {
            const token = localStorage.getItem('access_token')
            if(token != null && token != '' && token != undefined) {
                navigate('/')
            }
        })
    }
	return (
		<div className="text-center mt-5">
			  <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                <input type="text" className="form-control-plaintext" id="staticEmail" value={email} onChange={(event) => setEmail(event.target.value)} />
                </div>
            </div>
            <div className="mb-3 row">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                <input type="password" className="form-control" id="inputPassword"  value={password} onChange={(event) => setPassword(event.target.value)}/>
                </div>
            </div>
            <button onClick={submitRequest}>Login</button>
		</div>
	);
};
