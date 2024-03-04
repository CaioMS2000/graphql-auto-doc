import { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { allRecipesQueryDocument, allUsersQueryDocument } from "./lib/query";
import { queryElement, queryElements } from "./utils/indext";
import Header from "./components/Header";

export default function Content() {
	const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
	const selectedClass = ["bg-blue-900"];
	const { data: recipeQueryData } = useQuery(allRecipesQueryDocument, {
		// variables: { amount: 5 },
	});
	const { data: usersQueryData } = useQuery(allUsersQueryDocument);

	const recipes = recipeQueryData?.recipes;
	const users = usersQueryData?.users;

	function handleUserSelection(userId: number) {
		const listedUsers = queryElements("#users .user");
		const listedRecipes = queryElements("#recipes .recipe");
		const selectedClassReduced = selectedClass.reduce(
			(accumulator, currentValue) => {
				if (accumulator === "") {
					return currentValue;
				} else {
					return accumulator + " " + currentValue;
				}
			},
			""
		);

		listedUsers.forEach((LU) => {
			LU.classList.remove(selectedClassReduced);
		});
		listedRecipes.forEach((LR) => {
			LR.classList.remove(selectedClassReduced);
		});

		if (selectedUserId) {
			if (selectedUserId == userId) {
				setSelectedUserId(null);
				return;
			}
		}
		setSelectedUserId(userId);

		const clickedUser = Array.from(listedUsers).find((LU) => {
			const value = LU.attributes.getNamedItem("data-related")?.value;
			// .getAttribute("data-related")

			if (!value) return false;

			const converted = parseInt(value);
			const flag = converted == userId;

			return flag;
		});

		clickedUser?.classList.add(selectedClassReduced);

		const itsRecipes = Array.from(listedRecipes).filter((LR) => {
			const value = LR.attributes.getNamedItem("data-related")?.value;
			// .getAttribute("data-related")

			if (!value) return false;

			const converted = parseInt(value);
			const flag = converted == userId;

			return flag;
		});

		itsRecipes.forEach((recipe) => {
			recipe.classList.add(selectedClassReduced);
		});
	}

	return (
		<>
			<Header />
			<div
				id="wrapper"
				className="flex justify-center text-white p-1 gap-3 mt-10 max-w-[100vw]"
			>
				<div id="users" className="">
					<div className="flex flex-col rounded-lg bg-zinc-900">
						<h3 className="font-bold text-xl border-[4px] border-zinc-950 rounded-lg rounded-b-none p-3">
							Usuários do sistema
						</h3>
						<div className="flex flex-col">
							{users &&
								users.map((user) => (
									<div
										key={user.id}
										className="user cursor-pointer border-[4px] border-zinc-950 border-t-0 px-2 py-1 last:rounded-b-lg"
										data-related={user.id}
										onClick={() =>
											handleUserSelection(user.id)
										}
									>
										{user.name}
									</div>
								))}
						</div>
					</div>
				</div>

				<div id="recipes" className="">
					<table className="table-auto max-w-40 lg:max-w-4xl bg-zinc-900">
						<thead className="border-[4px] border-zinc-950">
							<tr className="">
								<td className="">
									<h3 className="font-bold text-xl pl-2 whitespace-nowrap">
										Receitas do sistema
									</h3>
								</td>
							</tr>
							<tr>
								<td className="pl-2">
									<p className="font-bold">Título</p>
								</td>
								<td className="pl-2">
									<p className="font-bold">Descrição</p>
								</td>
								<td className="pl-2">
									<p className="font-bold">Ingredientes</p>
								</td>
								<td className="pl-2">
									<p className="font-bold">Criação</p>
								</td>
							</tr>
						</thead>
						<tbody className="border-[4px] border-zinc-950">
							{recipes &&
								recipes.map((recipe) => (
									<tr
										key={recipe.id}
										data-related={recipe.userId}
										className="recipe"
									>
										<td className="px-2 border-r-[4px] border-b-[4px] border-zinc-950">
											<p className="p">{recipe.title}</p>
										</td>
										<td className="px-2 border-r-[4px] border-b-[4px] border-zinc-950">
											<p className="text-ellipsis">
												{recipe.description}
											</p>
										</td>
										<td className="px-2 border-r-[4px] border-b-[4px] border-zinc-950">
											<p className="text-ellipsis">
												{recipe.ingredients.reduce(
													(
														accumulator,
														currentValue
													) => {
														if (
															accumulator === ""
														) {
															return currentValue.name;
														} else {
															return (
																accumulator +
																", " +
																currentValue.name
															);
														}
													},
													""
												)}
											</p>
										</td>
										<td className="px-2 border-r-[4px] border-b-[4px] border-zinc-950">
											<p className="p">
												{new Date(
													recipe.creationDate
												).toLocaleString("pt-BR", {
													year: "numeric",
													month: "numeric",
													day: "numeric",
												})}
											</p>
										</td>
									</tr>
								))}
						</tbody>
					</table>
				</div>
			</div>
		</>
	);
}
