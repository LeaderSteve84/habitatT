import { useState } from 'react';

export default function LogRequest() {
    const [requestType, setRequestType] = useState('');
    const [urgencyLevel, setUrgencyLevel] = useState('');
    const [propertyAddress, setPropertyAddress] = useState('');
    const [description, setDescription] = useState('');

    const submitForm = (e) => {
        e.preventDefault();

        console.log({ requestType, urgencyLevel, propertyAddress, description });
        setRequestType('');
        setUrgencyLevel('');
        setPropertyAddress('');
        setDescription('');
    };

    return (
        <div className="bg-acent30 h-screen">
            <h2 className="text-center">Log Request</h2>

            <form onSubmit={submitForm} className="w-2/4 m-auto mt-10">
                <div className="flex justify-between mb-5">
                    <div>
                        <label className="block" htmlFor="requestType">Request Type </label>
                        <select
                            className="w-500 block px-5"
                            name="requestType"
                            id="requestType"
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                        >
                            <option value="">Select Request Type</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Borehole">Borehole</option>
                            <option value="Broken Tap">Broken Tap</option>
                            <option value="Leaking Roof">Leaking Roof</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div>
                        <label className="block" htmlFor="urgencyLevel">Request Level</label>
                        <select
                            className="w-500 block px-5"
                            name="urgencyLevel"
                            id="urgencyLevel"
                            value={urgencyLevel}
                            onChange={(e) => setUrgencyLevel(e.target.value)}
                        >
                            <option value="">Select Urgency Level</option>
                            <option value="Non Urgent">Non Urgent</option>
                            <option value="Trivial">Trivial</option>
                            <option value="Urgent">Urgent</option>
                            <option value="Severe">Severe</option>
                            <option value="Very Severe">Very Severe</option>
                        </select>
                    </div>
                </div>
                <label htmlFor="propertyAddress">Property Address</label>
                <input
                    className="block w-full"
                    type="text"
                    name="propertyAddress"
                    id="propertyAddress"
                    value={propertyAddress}
                    onChange={(e) => setPropertyAddress(e.target.value)}
                />
                <label className="block mt-5" htmlFor="description">Log Request Description</label>
                <textarea
                    className="block mb-2 w-full py-2 h-100"
                    name="description"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter Request Description"
                />
                <button className="rounded-lg bg-blue-700 p-2 block m-auto" type="submit">Submit Log Request</button>
            </form>
        </div>
    );
}
