import UserLayout from "./hoc/UserLayout/UserLayout";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Error404 from "./pages/Error404/Error404";

const routes = () => [
	{
		path: "/",
		element: <UserLayout />,
		children: [
			{path: "", element: <Home />},
			{path: "home", element: <Home />},
			{path: "about", element: <About />},
			{path: "*", element: <Error404 />},
		],
	},
];

export default routes;
