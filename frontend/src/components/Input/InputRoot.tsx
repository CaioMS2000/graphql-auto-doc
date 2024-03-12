import { PropsWithChildren, HTMLProps } from "react";

interface InputRootProps extends PropsWithChildren, HTMLProps<HTMLDivElement> {}

export default function InputRoot({
	className,
	children,
	...rest
}: InputRootProps) {
	return (
		<>
			<div
				{...rest}
				className={
					"my-input flex gap-3 p-1 border-2 w-fit rounded-lg" +
					` ${className}`
				}
			>
				{children}
			</div>
		</>
	);
}
