import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import "./style.css";
import { client } from "./lib/apollo.ts";
import NewUser from "./NewUser.tsx";
import Home from "./Home.tsx";
import NewRecipe from "./NewRecipe.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/new-user",
		element: <NewUser/>,
	},
	{
		path: "/new-recipe",
		element: <NewRecipe/>,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<RouterProvider router={router} />
		</ApolloProvider>
	</React.StrictMode>
);
