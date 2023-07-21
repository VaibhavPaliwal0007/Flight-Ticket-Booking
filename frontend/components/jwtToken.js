import { useEffect } from 'react';
import { setLogin } from '@/state';
import { useDispatch } from 'react-redux';

export default function Token()
{
    const dispatch = useDispatch();

    useEffect(() => {
        if(localStorage.getItem("jwt"))
        {
            dispatch(setLogin(localStorage.getItem("jwt")));
            // router.push('/home');
        }
        
    },[]);
}