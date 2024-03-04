import { PropsWithChildren, HTMLProps } from "react";
import { BsFileTextFill } from "react-icons/bs";

interface HeaderProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {}

export default function Header({ children, className, ...rest }: HeaderProps) {
	return (
		<>
			<div
				{...rest}
				className={
					"w-full max-w-[100vw] p-1 bg-blue-700 text-white" + ` ${className}`
				}
			>
				<p className="font-bold text-2xl inline-flex items-center gap-2">
					<BsFileTextFill /> Sistema de Receitas
				</p>
				{children}
			</div>
		</>
	);
}
