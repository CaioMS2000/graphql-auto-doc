import {
	PropsWithChildren,
	HTMLProps,
	FormEvent,
	ChangeEvent,
	useState,
} from "react";
import { RiFileList2Fill } from "react-icons/ri";
import { PiTextTFill } from "react-icons/pi";
import { ImList } from "react-icons/im";
import Header from "./components/Header";
import { useQuery } from "@apollo/client";
import { allUsersQueryDocument } from "./lib/query";
import { InputIcon, InputRoot, InputTag } from "./components/Input";
import Dropdown from "./components/Dropdown";
import BaseDropdown from "./components/BaseDropdown";

interface NewRecipeProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default function NewRecipe({ ...rest }: NewRecipeProps) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [ingredients, setIngredients] = useState<string[]>([]);
	const { data: usersQueryData } = useQuery(allUsersQueryDocument);
	const users = usersQueryData?.users;

	function handleUserSelection(userId: number) {
		console.log("clicked user", userId);
	}

	async function handleSend(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
		} catch (error) {
			console.log(error);
		}
	}

	return (
		<>
			<Header />
			<div
				id="wrapper"
				className="flex justify-center text-white p-1 gap-3 mt-10"
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

				<div id="form-box" className="">
					<form action="" onSubmit={handleSend}>
						<div id="form-box" className="flex flex-col">
							<div className="flex flex-col gap-3">
								<InputRoot>
									<InputIcon
										element={RiFileList2Fill}
										className="size-8 text-white"
									/>
									<InputTag
										value={title}
										onChange={(
											e: ChangeEvent<HTMLInputElement>
										) => {
											console.log(e.target.value);
										}}
									/>
								</InputRoot>
								<InputRoot>
									<InputIcon
										element={PiTextTFill}
										className="size-8 text-white"
									/>
									<InputTag
										value={description}
										onChange={(
											e: ChangeEvent<HTMLInputElement>
										) => {
											console.log(e.target.value);
										}}
									/>
								</InputRoot>

								{/* <BaseDropdown /> */}
								<Dropdown />
							</div>
							<button
								type="submit"
								className="text-white font-bold text-lg bg-blue-600 py-2 px-10 rounded-lg mt-5 mx-auto"
							>
								Criar receita
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
}
// title
// userId
// description
// ingredients
