import axios from '../api/axios';
import { useState } from 'react';
import useAuth from '../components/hooks/useAuth';

export default function Profile() {
    const { auth } = useAuth();

    const [formData, setFormData] = useState({
        emergencyContact: '',
        emergencyName: '',
        emergencyAddress: ''
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
            const response = await axios.post('/api/profile', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true,
            });
            console.log("Profile updated successfully:", response.data);
        } catch (err) {
            console.error("Error updating profile:", err);
        }
    };

    return (
        <div className="flex flex-col h-full w-full bg-acent30 p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Change Profile Information</h2>
            <form onSubmit={submitForm} className="w-full max-w-lg mx-auto bg-white p-8 shadow-lg rounded-lg">
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="emergencyName">Emergency Name</label>
                    <input
                        className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        name="emergencyName"
                        id="emergencyName"
                        value={formData.emergencyName}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="emergencyContact">Emergency Contact</label>
                    <input
                        className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        name="emergencyContact"
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 font-semibold mb-2" htmlFor="emergencyAddress">Emergency Address</label>
                    <input
                        className="block w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        type="text"
                        name="emergencyAddress"
                        id="emergencyAddress"
                        value={formData.emergencyAddress}
                        onChange={handleChange}
                    />
                </div>
                <button className="rounded-lg bg-blue-700 text-white p-2 w-full font-semibold hover:bg-blue-800" type="submit">Update</button>
            </form>
        </div>
    );
}
