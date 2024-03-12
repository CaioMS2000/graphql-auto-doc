import {
	PropsWithChildren,
	HTMLProps,
	FormEvent,
	useState,
	ChangeEvent,
	useEffect,
} from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { FaKeyboard } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import Header from "./components/Header";
import { InputIcon, InputRoot, InputTag } from "./components/Input";
import { useMutation } from "@apollo/client";
import { createUserQueryDocument } from "./lib/mutation";

interface NewUserProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default function NewUser({ ...rest }: NewUserProps) {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [createUserFunction, { data, loading, error }] = useMutation(createUserQueryDocument)

	async function handleSend(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		try {
			await createUserFunction({variables:{newUser:{email: email, name: name}}})
			setName('')
			setEmail('')
			
		} catch (error) {
			console.log(error)
			
		}
	}

	useEffect(() => {console.log(data)}, [data])

	return (
		<>
			<Header />
			<div
				id="wrapper"
				className="flex flex-col items-center gap-3 pt-24 min-h-40"
			>
				<div className="flex flex-col items-center">
					<BsFillPersonFill className="size-20 text-white" />
					<p className="text-lg text-white font-bold">
						Criando um novo usuário
					</p>
				</div>
				<form action="" onSubmit={handleSend}>
					<div id="form-box" className="flex flex-col">
						<div className="flex flex-col gap-3">
							<InputRoot>
								<InputIcon
									element={FaKeyboard}
									className="size-8 text-white"
								/>
								<InputTag
									value={name}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => {
										console.log(e.target.value);
										setName(e.currentTarget.value);
									}}
								/>
							</InputRoot>
							<InputRoot>
								<InputIcon
									element={IoMdMail}
									className="size-8 text-white"
								/>
								<InputTag
									value={email}
									onChange={(
										e: ChangeEvent<HTMLInputElement>
									) => {
										console.log(e.target.value);
										setEmail(e.currentTarget.value);
									}}
								/>
							</InputRoot>
						</div>
						<button
							type="submit"
							className="text-white font-bold text-lg bg-blue-600 py-2 px-10 rounded-lg mt-5 mx-auto"
						>
							Criar usuário
						</button>
					</div>
				</form>
			</div>
		</>
	);
}
