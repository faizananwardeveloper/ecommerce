import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import axios from "axios"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {signInUrl} from "../../urls/base-urls";


export default function SignIn(props) {
  const history = useHistory();
  const [loginErrors, setLoginErrors] = useState([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState({
    id: null,
    email: "",
    password: ""
  });
  
  function handleSubmit(event) {
    event.preventDefault();
    const {email, password} = event.target;
    const requestData = {
      email: email.value,
      password: password.value
    };
    axios.post(`${signInUrl}`, {user: requestData}, {
      headers: {
        'Accept': 'application/json'
      }
    })
        .then(response => {
          if (response.data.success == true) {
            const data = response.data.data;
            setUser({
              ...user,
              id: data.id,
              email: data.email,
              password: data.password
            });
            console.log('user is', user);
            window.localStorage.setItem('userObject', JSON.stringify({
              id: data.id,
              email: data.email,
              password: data.password
            }));
            window.localStorage.setItem('isLogin', true);
            toast.success("Account has been registered successfully");
            history.push("/");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch(error => {
          errors.map(e => {
            setLoginErrors(loginErrors => [...loginErrors, e + " "])
          });
        });
  }
  
  return (
      <div className="container mt-5 pb-5">
        <ToastContainer/>
        <div className="row justify-content-center pt-5">
          <div className="col-lg-5 col-md-7">
            <div className="card bg-gradient-gray-dark">
              <div className="card-body px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <h4 style={{color: "white"}}>Sign In</h4>
                  <p className="login-rrors">{loginErrors}</p>
                </div>
                <form role="form" onSubmit={handleSubmit}>
                  <div className="form-group mb-3">
                    <div className="input-group input-group-merge input-group-alternative">
                      <input
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className="form-control"
                          onChange={e => setEmail(e.target.value)}
                          value={email}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="input-group input-group-merge input-group-alternative">
                      <input
                          name="password"
                          type="password"
                          className="form-control"
                          placeholder="Enter your password"
                          onChange={e => setPassword(e.target.value)}
                          value={password}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button className="btn btn-warning btn-sm my-2">Sign in</button>
                  </div>
                </form>
                <div className="row mt-3">
                  <div className="offset-6 col-6 text-right">
                    <Link className="text-light" to="/users/sign_up"><small>Register</small></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}