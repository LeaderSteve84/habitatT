import MainSideBar from "../sidebar/MainSideBar"

export default function ListTenants() {

    const tenantList = []

    return (
        <div className="flex h-screen">
            <MainSideBar name="John Anthony" email="janthony@habitat.org" />
            <div className="w-full bg-gray-400 flex flex-col">
                <h1 className="text-center bg-slate-600 w-full p-4">Tenant Management</h1>

                <h2>List of All Tenants</h2>
                <table>
                    <thead>
                        <th>Tenant ID</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Address</th>
                        <th>Email Address</th>
                        <th>Date of Birth</th>
                        <th>Sex</th>
                        <th>Contact Number</th>
                        <th>Emergency Contact</th>
                        <th>Emergency Name</th>
                    </thead>
                    <tbody>
                        {tenantList.map((tenant, index) => {
                            <tr key={ }>
                                <td>{tenant[index]}</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}