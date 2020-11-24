import React from "react";
import Jobs from './Jobs'
import picture from './search.PNG'
import './main.css'

const Main = props => {

    const JOB_API_URL = 'http://localhost:3001/jobs'

    async function fetchJobs(updateCallBack) {
        const result = await fetch(JOB_API_URL);
        const json = await result.json();
      
        updateCallBack(json);
        //console.log({json});
      }

      const handleLogout = () => {    
        props.history.push('/');
      }  

    const mainDivStyle = {
        display: 'flex',
        minHeight: '100vh',
        margin: '20px 40px'
      } 
    
      const leftDivStyle = {
        width: '80%',
        padding: '40px',
        backgroundColor: 'rgb(56, 62, 63)'
      } 
    
      const rightDivStyle = {
        width: '20%',
        backgroundColor: 'rgb(77, 162, 183)',
        minHeight: '100%',
        position: 'relative'
      } 
    
      const imageStyle = {
        position: 'fixed',
        bottom: '30%',
        right: '9%'
      } 
    
      const h1Style = {
        fontfamily: 'Courier New',
        fontweight: 'bold',
        color: "#f1f1f1"
      } 

    const [jobList, updateJobs] = React.useState([]);

    React.useEffect(() => {
         fetchJobs(updateJobs);
    }, [])

   return (

    <div style={mainDivStyle}>
        <div style={leftDivStyle}>
            <h1 style={h1Style}>Job Hunter - Dev Jobs:</h1>
            <input type="button" onClick={handleLogout} value="Logout" />
            <Jobs jobs={jobList}/>
        </div>
        <div style={rightDivStyle}>
            <img src={picture} style={imageStyle} alt="searching for jobs" />
        </div>
    </div>
   );
};

export default Main;
