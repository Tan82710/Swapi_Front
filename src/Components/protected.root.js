import React from "react"
import { Route, Redirect } from "react-router-dom"
// import Login from "./login"
import auth from "./auth"

export const ProtectedRoot = ({ component: Component, ...rest }) => (

    <Route
        {...rest}
        render={props =>
            auth.getAuth()
             ? (<Component {...props} />) 
             : (<Redirect to={{
                        pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }}
                    />
                )
        }
    />
);