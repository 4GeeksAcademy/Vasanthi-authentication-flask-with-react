import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
	const { store, actions } = useContext(Context);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState();
    const navigate = useNavigate()
    function submitRequest() {
        const obj = {
            email: email,
            password: password
        }
        actions.getUserAdded(obj)
    }
    useEffect(() => {
      if(store.message != null && store.message != '') {
        setError(store.message)
      }
    },[store.message])
	return (
		<div className="text-center mt-5">
			  <div className="mb-3 row">
                <label htmlFor="staticEmail" className="col-sm-2 col-form-label" >Email</label>
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
            <button onClick={() => submitRequest()} disabled={error != null}>Submit</button>
            <div>
                {error != null && error}
                {error != null && <Link to="/login">Login</Link>}
            </div>
		</div>
	);
};
