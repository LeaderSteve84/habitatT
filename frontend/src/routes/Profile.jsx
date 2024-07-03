export default function Profile() {
    function submitForm() {
    }
    return (
        <div className="flex flex-col h-full w-full bg-acent30">
            <h2 className="text-center">Change Profile Information</h2>
            <form onSubmit={submitForm} className="w-2/4 m-auto mt-10">
                <label className="block">First Name</label>
                <input type="text" className="w-full" />
                <label className="block">Last Name</label>
                <input type="text" className="w-full" />
                <label className="block">Email Address</label>
                <input type="email" className="w-full" />
                <label className="block">Address</label>
                <input type="text" className="w-full" />
                <label className="block">Date of Birth</label>

                <div className="flex">
                    <input type="date" className="w-1/3" />
                    <div className="flex gap-4 ml-auto w-2/4 ">
                        <label className="font-bold">Sex</label>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor="">Male</label>
                        </div>
                        <div>
                            <input type="checkbox" />
                            <label htmlFor="">Female</label>
                        </div>
                    </div>
                </div>

                <div className="flex my-4 justify-between">
                    <div>
                        <label className="block">Contact Number</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label className="block">Emergency Contact</label>
                        <input type="text" />
                    </div>
                </div>

                <div className="flex my-4 justify-between">
                    <div>
                        <label className="block">Emergency Name</label>
                        <input type="text" />
                    </div>
                    <div>
                        <label className="block">Emergency Address</label>
                        <input type="text" />
                    </div>
                </div>

                <button className="rounded-lg bg-blue-700 p-2 block m-auto" type="submit">Update</button>
            </form>
        </div>
    )
}