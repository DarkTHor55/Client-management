// src/CreatePage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateJobSheet.css';

const CreateJobSheet = () => {
    const [newJob, setNewJob] = useState({
        clientName: '',
        contactInfo: '',
        receiveDate: '',
        inventoryReceive: '',
        reportIssue: '',
        clientNotes: '',
        assignedTechnician: '',
        deadline: '',
        price: '',
        status: ''
    });
    const [file, setFile] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewJob({ ...newJob, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('clientName', newJob.clientName);
        formData.append('contactInfo', newJob.contactInfo);
        formData.append('receiveDate', newJob.receiveDate);
        formData.append('inventoryReceive', newJob.inventoryReceive);
        formData.append('reportIssue', newJob.reportIssue);
        formData.append('clientNotes', newJob.clientNotes || '');
        formData.append('assignedTechnician', newJob.assignedTechnician);
        formData.append('deadline', newJob.deadline);
        formData.append('price', newJob.price);
        formData.append('status', newJob.status);
        if (file) {
            formData.append('inventoryImgDoc', file);
        }

        try {
            const response = await fetch('http://localhost:8080/api/v1/jobsheet', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) {
                navigate('/');
            } else {
                throw new Error('Failed to create job sheet');
            }
        } catch (error) {
            console.error('Error creating job sheet:', error);
        }
    };

    return (
        <div className="container">
            <h1>Create Job Sheet</h1>
            <form onSubmit={handleSubmit} className="form">
                <input type="text" name="clientName" placeholder="Client Name" value={newJob.clientName} onChange={handleChange} required />
                <input type="text" name="contactInfo" placeholder="Contact Info" value={newJob.contactInfo} onChange={handleChange} required />
                <input type="date" name="receiveDate" value={newJob.receiveDate} onChange={handleChange} required />
                <input type="text" name="inventoryReceive" placeholder="Inventory Received" value={newJob.inventoryReceive} onChange={handleChange} required />
                <input type="text" name="reportIssue" placeholder="Report Issue" value={newJob.reportIssue} onChange={handleChange} required />
                <input type="text" name="clientNotes" placeholder="Client Notes" value={newJob.clientNotes} onChange={handleChange} />
                <input type="text" name="assignedTechnician" placeholder="Assigned Technician" value={newJob.assignedTechnician} onChange={handleChange} required />
                <input type="date" name="deadline" value={newJob.deadline} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" value={newJob.price} onChange={handleChange} required />
                
                <select name="status" value={newJob.status} onChange={handleChange} required>
                    <option value="" disabled>Select Status</option>
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                </select>

                <input type="file" name="inventoryImgDoc" onChange={handleFileChange} />
                <button type="submit">Create</button>
            </form>
        </div>
    );
};

export default CreateJobSheet;
