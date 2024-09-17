import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import'./UpdateJobSheet.css'
const UpdateJobSheet = () => {
    const { id } = useParams();
    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);
    const [file, setFile] = useState(null);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setJob({ ...job, [name]: value });
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('clientName', job.clientName);
        formData.append('contactInfo', job.contactInfo);
        formData.append('receiveDate', job.receiveDate);
        formData.append('inventoryReceive', job.inventoryReceive);
        formData.append('reportIssue', job.reportIssue);
        formData.append('clientNotes', job.clientNotes || '');
        formData.append('assignedTechnician', job.assignedTechnician);
        formData.append('deadline', job.deadline);
        formData.append('price', job.price);
        formData.append('status', job.status);
        if (file) {
            formData.append('inventoryImgDoc', file);
        }

        try {
            const response = await fetch(`http://localhost:8080/api/v1/jobsheet/update/${id}`, {
                method: 'PUT',
                body: formData,
            });
            if (response.ok) {
                navigate('/');
            } else {
                throw new Error('Failed to update job sheet');
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container">
            <h1>Update Job Sheet</h1>
            {error && <p className="error-message">{error}</p>}
            {job ? (
                <form onSubmit={handleSubmit} className="form">
                    <input type="text" name="clientName" placeholder="Client Name" value={job.clientName || ''} onChange={handleChange} required />
                    <input type="text" name="contactInfo" placeholder="Contact Info" value={job.contactInfo || ''} onChange={handleChange} required />
                    <input type="date" name="receiveDate" value={job.receiveDate ? job.receiveDate.split('T')[0] : ''} onChange={handleChange} required />
                    <input type="text" name="inventoryReceive" placeholder="Inventory Received" value={job.inventoryReceive || ''} onChange={handleChange} required />
                    <input type="text" name="reportIssue" placeholder="Report Issue" value={job.reportIssue || ''} onChange={handleChange} required />
                    <input type="text" name="clientNotes" placeholder="Client Notes" value={job.clientNotes || ''} onChange={handleChange} />
                    <input type="text" name="assignedTechnician" placeholder="Assigned Technician" value={job.assignedTechnician || ''} onChange={handleChange} required />
                    <input type="date" name="deadline" value={job.deadline ? job.deadline.split('T')[0] : ''} onChange={handleChange} required />
                    <input type="number" name="price" placeholder="Price" value={job.price || ''} onChange={handleChange} required />

                    <select name="status" value={job.status || ''} onChange={handleChange} required>
                        <option value="" disabled>Select Status</option>
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>

                    <input type="file" name="inventoryImgDoc" onChange={handleFileChange} />
                    <button type="submit">Update</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UpdateJobSheet;
