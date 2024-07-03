export default function TenantManagement() {
    return (
        <div className="flex h-screen">
            <MainSideBar name="John Anthony" email="janthony@habitat.org" />

            <div className="w-full bg-gray-400 flex flex-col">
                <h1 className="text-center bg-slate-600 w-full p-4">Announcement</h1>
                <label>First Name</label>
                <input type="text" />
                <label>Last Name</label>
                <input type="text" />
                <label>Email Address</label>
                <input type="email" />
                <label>Date of Birth</label>
                <div>
                    <input type="text" />
                    <input type="radio" />
                    <input type="radio" />
                </div>
                <div>
                    <div>
                        <label htmlFor="">Contact Name</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label htmlFor="">Emergency Contact</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label htmlFor="">Emergency Name</label>
                        <input type="text" />
                    </div>

                    <div>
                        <label htmlFor="">Emergency Address</label>
                        <input type="text" />
                    </div>

                    <input type="text" />

                    <div>
                    <button>Add New Tenant</button>
                    <button>Update Tenant</button>
                    <button>View all Tenants</button>
                    </div>
                </div>
            </div>
        </div>
    )
}