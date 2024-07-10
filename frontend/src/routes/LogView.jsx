export default LogView(){
    return (
        <div>
            <h2>All Log Requests</h2>
            <p>Request ID: {reqID}</p>
            <p>{ReqType}</p>
            <p>{reqDesc}</p>

            <div className="flex">
                <p>Logged By:</p>
                <p>{reqLogBy}</p>
            </div>

            <div className="flex">
                <p>Address:</p>
                <p>{reqAddress}</p>
            </div>

            <div className="flex">
                <p>Urgency Level:</p>
                <p>{reqUrgency}</p>
            </div>

            <div className="flex">
                <p>Request Status:</p>
                <p>{reqStatus}</p>
            </div>

            <div className="flex">
                <p>Request Type:</p>
                <p>{reqType}</p>
            </div>

            <div className="flex">
                <p>Logged Date:</p>
                <p>{reqDate}</p>
            </div>

            <div>
                <button>Update</button>
                <button>Update Status</button>
                <button>Resolved</button>
                <button>Archived</button>
            </div>
        </div>
    )
}