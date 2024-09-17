// src/HomePage.js
import  { useEffect, useState } from 'react';
import './HomePage.css'; 
const HomePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/jobsheet'); 
                const result = await response.json();
                setData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Contact Info</th>
                        <th>Receive Date</th>
                        <th>Inventory Received</th>
                        <th>Report Issue</th>
                        <th>Client Notes</th>
                        <th>Assigned Technician</th>
                        <th>Deadline</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.clientName}</td>
                            <td>{item.contactInfo}</td>
                            <td>{item.receiveDate}</td>
                            <td>{item.inventoryReceive}</td>
                            <td>{item.reportIssue}</td>
                            <td>{item.clientNotes}</td>
                            <td>{item.assignedTechnician}</td>
                            <td>{item.deadline}</td>
                            <td>{item.price}</td>
                            <td>{item.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;
