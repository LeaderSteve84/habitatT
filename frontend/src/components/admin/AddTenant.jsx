import axios from '../../api/axios';
import AuthContext from '../context/AuthProvider';
import useAuth from '../hooks/useAuth';
import { useNavigate } from "react-router-dom";
import { useContext, useState } from 'react';

function generatePassword() {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let retVal = "";
    for (let i = 0; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return retVal;
}

const randomPassword = generatePassword();

export default function AddTenant() {
    // const { auth } = useAuth();
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        address: '',
        DoB: '',
        sex: '',
        rentageFee: '',
        rentageAmount: '',
        paidDate: '',
        rentageStart: '',
        rentageExpires: '',
        arrears: '',
        emergencyName: '',
        emergencyPhone: '',
        emergencyAddress: '',
        leaseAgreementDetails: ''
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
            const backendData = {
                name: {
                    fname: formData.fname,
                    lname: formData.lname
                },
                password: randomPassword,
                DoB: formData.DoB,
                sex: formData.sex,
                contactDetails: {
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address
                },
                emergencyContact: {
                    name: formData.emergencyName,
                    phone: formData.emergencyPhone,
                    address: formData.emergencyAddress
                },
                tenancyInfo: {
                    fees: parseFloat(formData.rentageFee),
                    paid: parseFloat(formData.rentageAmount),
                    datePaid: formData.paidDate,
                    start: formData.rentageStart,
                    expires: formData.rentageExpires,
                    arrears: formData.arrears
                },
                leaseAgreementDetails: formData.leaseAgreementDetails
            };

            const response = await axios.post('/api/admin/tenants', backendData,
                // headers: {
                //     'Content-Type': 'application/json',
                //     'Authorization': `Bearer ${auth.accessToken}`
                // },
                // withCredentials: true,
            );

            console.log(backendData);

            console.log("Tenant added successfully:", response.backendData);
            navigate('/home/messages');
        } catch (err) {
            console.error("Error adding tenant:", err);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-2xl fixed top-0 font-bold text-center py-4 text-gray-800">Add New Tenant</h1>
            <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md mt-20">
                <form onSubmit={submitForm} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">First Name</label>
                            <input type="text" name="fname" value={formData.fname} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Last Name</label>
                            <input type="text" name="lname" value={formData.lname} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                            <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Date of Birth</label>
                            <input type="date" name="DoB" value={formData.DoB} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sex</label>
                            <div className="flex items-center space-x-4 mt-1">
                                <label className="flex items-center">
                                    <input type="radio" name="sex" value="Male" checked={formData.sex === 'Male'} onChange={handleChange} className="form-radio" />
                                    <span className="ml-2">Male</span>
                                </label>
                                <label className="flex items-center">
                                    <input type="radio" name="sex" value="Female" checked={formData.sex === 'Female'} onChange={handleChange} className="form-radio" />
                                    <span className="ml-2">Female</span>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rentage Fee</label>
                            <input type="text" name="rentageFee" value={formData.rentageFee} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rentage Amount</label>
                            <input type="text" name="rentageAmount" value={formData.rentageAmount} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Paid Date</label>
                            <input type="date" name="paidDate" value={formData.paidDate} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rentage Start</label>
                            <input type="date" name="rentageStart" value={formData.rentageStart} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Rentage Expires</label>
                            <input type="date" name="rentageExpires" value={formData.rentageExpires} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Arrears</label>
                            <input type="text" name="arrears" value={formData.arrears} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Emergency Name</label>
                            <input type="text" name="emergencyName" value={formData.emergencyName} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Emergency Phone Number</label>
                            <input type="text" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Emergency Address</label>
                        <input type="text" name="emergencyAddress" value={formData.emergencyAddress} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Lease Agreement Link</label>
                        <input type="text" name="leaseAgreementDetails" value={formData.leaseAgreementDetails} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                        Add New Tenant
                    </button>
                </form>
            </div>
        </div>
    );
}
