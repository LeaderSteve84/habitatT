import { v4 as uuidv4 } from 'uuid';
import { propertyList } from "../../dummyData";

export default function ListProperty() {
    return (
        <div className="flex h-screen">
            <div className="w-full bg-gray-400 flex flex-col">
                <h1 className="text-center bg-slate-600 w-full p-4">Tenant Management</h1>

                <h2 className="p-4">List of All Properties</h2>
                <table className="table-auto border-collapse border border-gray-800 mx-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-600 p-2">Address</th>
                            <th className="border border-gray-600 p-2">Type</th>
                            <th className="border border-gray-600 p-2">Availability</th>
                            <th className="border border-gray-600 p-2">Fee</th>
                        </tr>
                    </thead>
                    <tbody>
                        {propertyList.map((property) => (
                            <tr key={uuidv4()} className="bg-white hover:bg-gray-100">
                                <td className="border border-gray-600 p-2">{property.address}</td>
                                <td className="border border-gray-600 p-2">{property.type}</td>
                                <td className="border border-gray-600 p-2">{property.unitAvailability}</td>
                                <td className="border border-gray-600 p-2">{property.rentalFees}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
