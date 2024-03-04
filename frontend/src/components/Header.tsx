import { PropsWithChildren, HTMLProps } from "react";
import { BsFileTextFill } from "react-icons/bs";

interface HeaderProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {}

export default function Header({ children, className, ...rest }: HeaderProps) {
	return (
		<>
			<div
				{...rest}
				className={
					"flex justify-between w-full max-w-[100vw] p-1 bg-blue-700 text-white" +
					` ${className}`
				}
			>
				<a href="/">
					<p className="font-bold text-2xl inline-flex items-center gap-2">
						<BsFileTextFill /> Sistema de Receitas
					</p>
				</a>
				<div className="menu flex gap-5 pr-2 text-lg font-bold">
					<div className="option">
						<a className="" href="/new-user">
							Criar usuário
						</a>
					</div>
					<div className="option">
						<a className="" href="/new-recipe">
							Criar receita
						</a>
					</div>
				</div>
			</div>
		</>
	);
}
