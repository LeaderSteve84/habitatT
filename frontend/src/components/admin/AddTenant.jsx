import axios from '../../api/axios';
import useAuth from '../hooks/useAuth';
import { useState } from 'react';

export default function AddTenant() {
    const { auth } = useAuth();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        address: '',
        dateOfBirth: '',
        sex: '',
        rentageFee: '',
        rentageAmount: '',
        paidDate: '',
        rentageStart: '',
        rentageExpires: '',
        arrears: '',
        emergencyName: '',
        emergencyPhoneNumber: '',
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
            const response = await axios.post('/api/tenants', JSON.stringify(formData), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${auth.accessToken}`
                },
                withCredentials: true,
            });
            console.log("Tenant added successfully:", response.data);
        } catch (err) {
            console.error("Error adding tenant:", err);
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-full bg-gray-400 flex flex-col">
                <h1 className="text-center bg-slate-600 w-full p-4">Add New Tenant</h1>
                <form onSubmit={submitForm} className="w-2/4 m-auto mt-10">
                    <label>First Name</label>
                    <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full" />

                    <label>Last Name</label>
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full" />

                    <label>Email Address</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full" />

                    <label>Phone Number</label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full" />

                    <label>Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full" />

                    <label>Date of Birth</label>
                    <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} className="w-full" />

                    <label>Sex</label>
                    <div>
                        <label>
                            <input type="radio" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleChange} />
                            Male
                        </label>
                        <label>
                            <input type="radio" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleChange} />
                            Female
                        </label>
                    </div>

                    <label>Rentage Fee</label>
                    <input type="text" name="rentageFee" value={formData.rentageFee} onChange={handleChange} className="w-full" />

                    <label>Rentage Amount</label>
                    <input type="text" name="rentageAmount" value={formData.rentageAmount} onChange={handleChange} className="w-full" />

                    <label>Paid Date</label>
                    <input type="date" name="paidDate" value={formData.paidDate} onChange={handleChange} className="w-full" />

                    <label>Rentage Start</label>
                    <input type="date" name="rentageStart" value={formData.rentageStart} onChange={handleChange} className="w-full" />

                    <label>Rentage Expires</label>
                    <input type="date" name="rentageExpires" value={formData.rentageExpires} onChange={handleChange} className="w-full" />

                    <label>Arrears</label>
                    <input type="text" name="arrears" value={formData.arrears} onChange={handleChange} className="w-full" />

                    <label>Emergency Name</label>
                    <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} className="w-full" />

                    <label>Emergency Phone Number</label>
                    <input type="text" name="emergencyPhoneNumber" value={formData.emergencyPhoneNumber} onChange={handleChange} className="w-full" />

                    <label>Emergency Address</label>
                    <input type="text" name="emergencyAddress" value={formData.emergencyAddress} onChange={handleChange} className="w-full" />

                    <button type="submit" className="rounded-lg bg-blue-700 p-2 block m-auto">Add New Tenant</button>
                </form>
            </div>
        </div>
    );
}
