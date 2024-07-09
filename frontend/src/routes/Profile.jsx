import axios from '../api/axios';
import { useState } from 'react';
import useAuth from '../components/hooks/useAuth';

export default function Profile() {
    const { auth } = useAuth();

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        address: '',
        dateOfBirth: '',
        sex: '',
        phone: '',
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
        <div className="flex flex-col h-full w-full bg-acent30">
            <h2 className="text-center">Change Profile Information</h2>
            <form onSubmit={submitForm} className="w-2/4 m-auto mt-10">
                <label className="block">First Name</label>
                <input type="text" name="first_name" className="w-full" value={formData.first_name} onChange={handleChange} />

                <label className="block">Last Name</label>
                <input type="text" name="last_name" className="w-full" value={formData.last_name} onChange={handleChange} />

                <label className="block">Email Address</label>
                <input type="email" name="email" className="w-full" value={formData.email} onChange={handleChange} />

                <label className="block">Address</label>
                <input type="text" name="address" className="w-full" value={formData.address} onChange={handleChange} />

                <label className="block">Date of Birth</label>
                <div className="flex">
                    <input type="date" name="dateOfBirth" className="w-1/3" value={formData.dateOfBirth} onChange={handleChange} />
                    <div className="flex gap-4 ml-auto w-2/4 ">
                        <label className="font-bold">Sex</label>
                        <div>
                            <input type="checkbox" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleChange} />
                            <label>Male</label>
                        </div>
                        <div>
                            <input type="checkbox" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleChange} />
                            <label>Female</label>
                        </div>
                    </div>
                </div>

                <div className="flex my-4 justify-between">
                    <div>
                        <label className="block">Contact Number</label>
                        <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block">Emergency Contact</label>
                        <input type="text" name="emergencyContact" value={formData.emergencyContact} onChange={handleChange} />
                    </div>
                </div>

                <div className="flex my-4 justify-between">
                    <div>
                        <label className="block">Emergency Name</label>
                        <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className="block">Emergency Address</label>
                        <input type="text" name="emergencyAddress" value={formData.emergencyAddress} onChange={handleChange} />
                    </div>
                </div>

                <button className="rounded-lg bg-blue-700 p-2 block m-auto" type="submit">Update</button>
            </form>
        </div>
    );
}
