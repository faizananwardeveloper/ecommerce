import React from "react";
import {Link, useHistory} from "react-router-dom"

export default function Header() {
  const history = useHistory();
  const logout = () => {
    window.localStorage.removeItem('isLogin');
    history.push('/');
  };
  return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand" href="#">E-Commerce System</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-item nav-link active" to="/"> Home <span className="sr-only">(current)</span></Link>
            <Link className="nav-item nav-link active" to="#" onClick={() => logout()}> Logout </Link>
            {/*<Link className="nav-item nav-link" to='#' onClick={() => logout()}> Logout </Link>*/}
          </div>
        </div>
      </nav>
  )
}