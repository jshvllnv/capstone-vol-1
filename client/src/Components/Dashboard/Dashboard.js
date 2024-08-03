import React, { Fragment, useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import '../Dashboard/Dashboard.css';

const Dashboard = ({setAuth}) => {

  const [name, setName] = useState("");

  async function getName() {
    try {
      const response = await fetch("http://localhost:4000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseResponse = await response.json();

      setName(parseResponse.name);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
  }, []);

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.success("Logged out successfully!")
  }

  return (
    <Fragment>
        <div className='nav-bar'>
        <div className='navigation-bar'>
            <div className='navigation-bar-logo'>
                <h1>ABC School Name</h1>
            </div>

            <button onClick={e => logout(e)}>Logout</button>
        </div>
        </div>

        <div className='body-container'>
          <div className='side-bar'>

          </div>
        </div>

    </Fragment>
  )
}

export default Dashboard;