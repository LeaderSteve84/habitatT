import MainSideBar from "../sidebar/MainSideBar"

export default function Announcement() {
    return (
        <div className="flex h-screen">
            <MainSideBar name="John Anthony" email="janthony@habitat.org" />

            <div className="w-full bg-gray-400 flex flex-col">
                <h1 className="text-center bg-slate-600 w-full p-4">Announcement</h1>

                <div>
                    <h3>Announcement Content</h3>
                    <textarea
                        value={text}
                        placeholder="Type a message"
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="px-2 w-3/5 rounded-lg bg-slate-300"
                    />
                </div>

                <div>
                    <h3>Schedule Date</h3>
                    <input
                        type="date"
                        placeholder="Select Schedule Date:"
                        onKeyDown={handleKeyDown}
                        className="px-2 w-3/5 rounded-lg bg-slate-300"
                    />
                </div>

                <button>Post Announcement</button>
            </div>
        </div>
    )
}