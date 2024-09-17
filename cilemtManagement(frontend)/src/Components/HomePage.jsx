import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/jobsheet');
                const result = await response.json();
                setData(result);
                console.log('Data fetched:', result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSearch = () => {
        const trimmedSearchTerm = searchTerm.trim();
        if (trimmedSearchTerm) {
            navigate(`/view/${trimmedSearchTerm}`);
        } else {
            alert('Please enter a client ID to search');
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/v1/jobsheet/delete/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setData(data.filter(item => item.clientId !== id));
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const filteredData = data.filter(item =>
        item.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.contactInfo.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container">
            <h1>Dashboard</h1>
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search by client id"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                />
                <button className="search-button" onClick={handleSearch}>
                    Search
                </button>
            </div>
            <button
                className="create-button"
                onClick={() => navigate('/create')}
            >
                Create Job Sheet
            </button>
            
            <table className="data-table">
                <thead>
                    <tr>
                        <th>Client Id</th>
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
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.length > 0 ? (
                        filteredData.map((item) => (
                            <tr key={item.clientId}>
                                <td>{item.clientId}</td>
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
                                <td>
                                    <button onClick={() => navigate(`/view/${item.clientId}`)} className="view-button">View</button>
                                    <button onClick={() => navigate(`/update/${item.clientId}`)} className="update-button">Update</button>
                                    <button onClick={() => handleDelete(item.clientId)} className="delete-button">Delete</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="12">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default HomePage;
