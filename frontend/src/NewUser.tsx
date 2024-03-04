import { PropsWithChildren, HTMLProps } from "react";
import Header from "./components/Header";

interface NewUserProps extends PropsWithChildren, HTMLProps<HTMLElement> {}

export default function NewUser({ ...rest }: NewUserProps) {
	function handleSend() {}

	return (
		<>
			<Header />
			<div id="wrapper" className="">
				<form action="" onSubmit={handleSend}>
				</form>
			</div>
		</>
	);
}
