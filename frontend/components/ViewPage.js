import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function ViewPage()
{
    const router = useRouter();
    let id = router.query.id;
    const token = useSelector((state) => state.auth.token);

    async function fetchFlight() {
        console.log(id);
        if (id) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/flight/view/${id}`, {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await res.json();
            console.log(data);
        }
    };

    useEffect(() => { fetchFlight() }, [id]);

    return(
        <h1>
            vieww {id}
        </h1>
    )
};