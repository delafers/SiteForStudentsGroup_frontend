import React, {Suspense} from "react";
import Loading from "../Components/Loading/Loading";


export const withSuspense = (Component) => {
    return (props) => {
        return <Suspense fallback={<Loading/>}>
            <Component {...props}/>
        </Suspense>

    }
}