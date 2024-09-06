import { Provider } from "react-redux"
import Authenzation from "../Components/Authenzation"
import { store } from "../UI/index"

function LoginPage() {
    return (
        <>
           <Provider store={store}>
                <Authenzation/>
           </Provider>
        </>
    )
}
export default LoginPage