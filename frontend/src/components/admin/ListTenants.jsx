import { v4 as uuidv4 } from 'uuid';
import { tenantList } from "../../dummyData";

export default function ListTenants() {
    return (
        <div className="flex h-screen">
            <div className="w-full bg-gray-400 flex flex-col">
                <h1 className="text-center bg-slate-600 w-full p-4">Tenant Management</h1>

                <h2 className="p-4">List of All Tenants</h2>
                <table className="table-auto border-collapse border border-gray-800 mx-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-600 p-2">Tenant ID</th>
                            <th className="border border-gray-600 p-2">First Name</th>
                            <th className="border border-gray-600 p-2">Last Name</th>
                            <th className="border border-gray-600 p-2">Address</th>
                            <th className="border border-gray-600 p-2">Email Address</th>
                            <th className="border border-gray-600 p-2">Date of Birth</th>
                            <th className="border border-gray-600 p-2">Sex</th>
                            <th className="border border-gray-600 p-2">Contact Number</th>
                            <th className="border border-gray-600 p-2">Emergency Contact</th>
                            <th className="border border-gray-600 p-2">Emergency Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tenantList.map((tenant) => (
                            <tr key={uuidv4()} className="bg-white hover:bg-gray-100">
                                <td className="border border-gray-600 p-2">{tenant.TenantId}</td>
                                <td className="border border-gray-600 p-2">{tenant.firstName}</td>
                                <td className="border border-gray-600 p-2">{tenant.lastName}</td>
                                <td className="border border-gray-600 p-2">{tenant.address}</td>
                                <td className="border border-gray-600 p-2">{tenant.email}</td>
                                <td className="border border-gray-600 p-2">{tenant.dob}</td>
                                <td className="border border-gray-600 p-2">{tenant.sex}</td>
                                <td className="border border-gray-600 p-2">{tenant.contactNumber}</td>
                                <td className="border border-gray-600 p-2">{tenant.emergencyContact}</td>
                                <td className="border border-gray-600 p-2">{tenant.emergencyName}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
