import { PropsWithChildren, HTMLProps } from "react";

interface InputTagProps extends PropsWithChildren, HTMLProps<HTMLInputElement> {}

export default function InputTag({className, ...rest }: InputTagProps) {
	return (
		<>
			<input
            { ...rest }
				type="text"
				className={"caret-white text-white bg-transparent active:border-0 active:outline-none focus:border-0 focus:outline-none" + ` ${className}`}
			/>
		</>
	);
}
