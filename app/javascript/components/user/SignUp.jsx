import React, {useState} from "react"
import {Link, useHistory} from "react-router-dom"
import axios from "axios"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {SignUpUrl} from "../../urls/base-urls";


export default function SignUp(props) {
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
    axios.post(`${SignUpUrl}`, requestData, {
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
            window.localStorage.setItem('userObject', JSON.stringify({
              id: data.id,
              email: data.email,
              password: data.password
            }));
            console.log('user____is', window.localStorage.getItem('userObject'));
            window.localStorage.setItem('isLogin', true);
            toast.success("Signed in successfully");
            history.push("/");
          } else {
            toast.error(response.data.message);
          }
        })
        .catch(error => {
          console.log('errors_____', error);
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
                  <h4 style={{color: "white"}}>Sign Up</h4>
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
                    <button className="btn btn-warning btn-sm my-2">Sign Up</button>
                  </div>
                </form>
                <div className="row mt-3">
                  <div className="offset-6 col-6 text-right">
                    <Link className="text-light" to="/users/sign_in"><small>Login</small></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}