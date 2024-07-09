import { useState } from 'react';
import axios from '../../../api/axios';
import useAuth from '../../hooks/useAuth';

export default function UpdateAdProperty({ propertyId }) {
    const { auth } = useAuth();

    const [formData, setFormData] = useState({
        address: '',
        type: '',
        unitAvailability: '',
        rentageFee: ''
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
            
            const response = await axios.put(`/api/properties/${propertyId}`, JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true,
            });
            console.log("Property updated successfully:", response.data);
        } catch (err) {
            console.error("Error updating property:", err);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form className="bg-white p-8 rounded-lg shadow-md w-96" onSubmit={submitForm}>
                <h2 className="text-2xl font-bold mb-6 text-center">Update Listed Property</h2>
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-700">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div className="mb-4">
                    <label htmlFor="type" className="block text-gray-700">Type</label>
                    <input type="text" name="type" value={formData.type} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div className="mb-4">
                    <span className="block text-gray-700">Unit Availability</span>
                    <div className="flex items-center mt-2">
                        <input type="radio" name="unitAvailability" value="Yes" checked={formData.unitAvailability === 'Yes'} onChange={handleChange} className="mr-2" />
                        <label htmlFor="yes" className="mr-4">Yes</label>
                        <input type="radio" name="unitAvailability" value="No" checked={formData.unitAvailability === 'No'} onChange={handleChange} className="mr-2" />
                        <label htmlFor="no">No</label>
                    </div>
                </div>
                <div className="mb-6">
                    <label htmlFor="rentageFee" className="block text-gray-700">Rentage Fee</label>
                    <input type="text" name="rentageFee" value={formData.rentageFee} onChange={handleChange} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">Submit</button>
            </form>
        </div>
    );
}
