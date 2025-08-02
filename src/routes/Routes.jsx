
import { createBrowserRouter } from 'react-router';
import Root from '../layout/Root';
import ErrorPage from '../pages/ErrorPage';
import HomePage from '../pages/HomePage';
import AboutUs from '../pages/AboutUs';
import Contact from '../pages/Contact';

const Routes = createBrowserRouter (
    [
        {
            path:"/",
            element:<Root></Root>,
            errorElement:<ErrorPage></ErrorPage>,
            children:[
                {
                    path:"/",
                    element:<HomePage></HomePage>
                },
                {
                    path:"/aboutus",
                    element:<AboutUs></AboutUs>
                },
                {
                    path:"/contact",
                    element:<Contact></Contact>
                },
            ]
        }
    ]
)

export default Routes;