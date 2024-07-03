import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <h1 className="font-bold text-6xl">Oops!</h1>
            <p className="text-2xl mt-6">Sorry, an unexpected error has occurred.</p>
            <p className="text-2xl mt-4">
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}