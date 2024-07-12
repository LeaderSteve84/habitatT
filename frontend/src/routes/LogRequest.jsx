import { useState } from 'react';
import axios from '../api/axios';
import useAuth from '../components/hooks/useAuth';

export default function LogRequest() {
    const { auth } = useAuth();

    const [formData, setFormData] = useState({
        loggedBy: '',
        requestType: '',
        urgencyLevel: '',
        propertyAddress: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const submitForm = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/log-request', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true,
            });
            console.log("Log request added successfully:", response.data);
        } catch (err) {
            console.error("Error adding log request:", err);
        }
    };

    return (
        <div className="bg-gray-100 h-full p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Create Log Request</h2>

            <form onSubmit={submitForm} className="w-full max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="loggedBy">Logged by</label>
                    <input
                        className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        name="loggedBy"
                        id="loggedBy"
                        value={formData.loggedBy}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="requestType">Request Type</label>
                    <select
                        className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="requestType"
                        id="requestType"
                        value={formData.requestType}
                        onChange={handleChange}
                    >
                        <option value="">Select Request Type</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Borehole">Borehole</option>
                        <option value="Broken Tap">Broken Tap</option>
                        <option value="Leaking Roof">Leaking Roof</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="urgencyLevel">Urgency Level</label>
                    <select
                        className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="urgencyLevel"
                        id="urgencyLevel"
                        value={formData.urgencyLevel}
                        onChange={handleChange}
                    >
                        <option value="">Select Urgency Level</option>
                        <option value="Non Urgent">Non Urgent</option>
                        <option value="Trivial">Trivial</option>
                        <option value="Urgent">Urgent</option>
                        <option value="Severe">Severe</option>
                        <option value="Very Severe">Very Severe</option>
                    </select>
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="propertyAddress">Property Address</label>
                    <input
                        className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        name="propertyAddress"
                        id="propertyAddress"
                        value={formData.propertyAddress}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="description">Log Request Description</label>
                    <textarea
                        className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter Request Description"
                    />
                </div>
                <button className="rounded-lg bg-blue-700 text-white p-2 w-full font-semibold hover:bg-blue-800" type="submit">Submit Log Request</button>
            </form>
        </div>
    );
}
