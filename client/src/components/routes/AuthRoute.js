import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { UserContext } from "../../context";

const AuthRoute = ({...rest}) => {
    const [state, setState] = useContext(UserContext);

    if(!state){
        return <Redirect to="/signin" />
    }

    return state && state.token ? <Route {...rest} /> : "";
}

export default AuthRoute;