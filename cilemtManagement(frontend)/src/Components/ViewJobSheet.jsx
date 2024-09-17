// src/ViewPage.js
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ViewJobSheet.css'; // Make sure you have this CSS file

const ViewJobSheet = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchJob = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/v1/jobsheet/${id}`);
                if (response.ok) {
                    const result = await response.json();
                    setJob(result);
                } else {
                    throw new Error('Job not found');
                }
            } catch (error) {
                setError(error.message);
            }
        };

        fetchJob();
    }, [id]);

  

    return (
        <div className="container">
            <h1>View Job Sheet</h1>
            {error && <p className="error-message">{error}</p>}
            {job ? (
                <div className="details">
                    <p><strong>Client Name:</strong> {job.clientName}</p>
                    <p><strong>Contact Info:</strong> {job.contactInfo}</p>
                    <p><strong>Receive Date:</strong> {job.receiveDate}</p>
                    <p><strong>Inventory Received:</strong> {job.inventoryReceive}</p>
                    <p><strong>Report Issue:</strong> {job.reportIssue}</p>
                    <p><strong>Client Notes:</strong> {job.clientNotes}</p>
                    <p><strong>Assigned Technician:</strong> {job.assignedTechnician}</p>
                    <p><strong>Deadline:</strong> {job.deadline}</p>
                    <p><strong>Price:</strong> {job.price}</p>
                    <p><strong>Status:</strong> {job.status}</p>
                    <button onClick={() => navigate(`/update/${id}`)} className="update-button">Update</button>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewJobSheet;
