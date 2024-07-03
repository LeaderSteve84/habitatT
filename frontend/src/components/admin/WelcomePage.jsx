export default function WelcomePage() {
    return (
        <div className="flex h-screen">
            <div className="w-full bg-gray-400 flex flex-col">
                <h1>Welcome back</h1>
                {/* {Announcement &&
                    <div>
                        <h2>{Announcement}</h2>
                        <h3>{Announcement.title}</h3>
                        <p>{Announcement.description}</p>
                        <p>Deadline {Announcement.date}</p>
                        <button>Update</button>
                    </div>
                } */}
                {/* {logRequest &&
                    <div>
                        <h2>Recent Log Request</h2>
                        <h3>{log.title}</h3>
                        <p>{log.description}</p>
                        <p>Logged By: {fname} {lname}</p>
                        <p>Address: {address}</p>
                        <p>Request Level: {log.level}</p>
                        <p>Request Type: {log.type}</p>
                        <button>Update</button>
                    </div>
                } */}
            </div>

        </div>
    )
}