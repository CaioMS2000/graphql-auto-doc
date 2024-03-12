import { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { ImCross, ImList } from "react-icons/im";
import "../style.css";

interface Option {
	value: string;
	label: string;
}

interface DropdownProps {
	options: Option[];
	selectedOptionsSetter: Function;
	selectedOptionsVariable: string[];
}

const Dropdown = ({
	options,
	selectedOptionsSetter,
	selectedOptionsVariable,
}: DropdownProps) => {
	const [isOpen, setIsOpen] = useState(false);
	// const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	// const [options] = useState<Option[]>([
	// 	{ value: "option-1", label: "Opção 1" },
	// 	{ value: "option-2", label: "Opção 2" },
	// 	{ value: "option-3", label: "Opção 3" },
	// ]);

	const handleSelect = (option: Option) => {
		const newSelectedOptions = selectedOptionsVariable.includes(
			option.value
		)
			? selectedOptionsVariable.filter((o) => o !== option.value)
			: [...selectedOptionsVariable, option.value];
		selectedOptionsSetter(newSelectedOptions);
	};

	const handleRemove = (option: Option) => {
		const flag = selectedOptionsVariable.includes(option.value);

		if (flag) {
			const filtered = selectedOptionsVariable.filter((o) => {
				const res = o !== option.value;
				return res;
			});
			selectedOptionsSetter(filtered);
		}
	};

	const handleOpen = () => {
		setIsOpen(true);
	};

	const handleClose = () => {
		setIsOpen(false);
	};

	return (
		<div className="relative">
			<button
				onClick={handleOpen}
				className="bg-zinc-900 px-4 py-2 rounded-md text-white inline-flex gap-2"
			>
				<ImList className="size-5 text-white" />
				Selecionar Opções
			</button>

			{isOpen && (
				<div className="absolute top-0 left-0 z-10 mt-2 bg-zinc-900 rounded-md shadow-md">
					<div className="flex flex-col">
						<button
							onClick={handleClose}
							className="p-2 rounded-md text-gray-700 justify-end flex"
						>
							<ImCross className="text-red-400" />
						</button>
						<div
							id="dropdown-options-wrapper"
							className="px-4 py-1 flex flex-wrap min-w-80 max-w-[70vw] w-fit gap-2 max-h-52 overflow-scroll overflow-x-hidden"
						>
							{options.map((option) => {
								const isSelected =
									selectedOptionsVariable.includes(
										option.value
									);
								return (
									<div
										key={option.value}
										className={`flex items-center gap-5 justify-between p-2 mb-1 border rounded-md cursor-pointer hover:bg-zinc-300 text-white hover:text-zinc-800 ${
											isSelected
												? "border-blue-600 border-2"
												: ""
										}`}
										onClick={() => handleSelect(option)}
									>
										<span
											className={`${
												isSelected
													? "text-blue-600 font-bold"
													: ""
											}`}
										>
											{option.label}
										</span>
										{selectedOptionsVariable.includes(
											option.value
										) && (
											<FaCircle className="w-4 h-4 fill-current text-blue-600" />
										)}
									</div>
								);
							})}
						</div>
					</div>
				</div>
			)}

			<div className="mt-1 flex flex-wrap gap-2 max-w-72 md:max-w-[500px]">
				{/* Opções Selecionadas:{" "} */}
				{selectedOptionsVariable.map((option) => {
					const foundOption = options.find((o) => o.value === option);
					return (
						foundOption && (
							<div
								key={foundOption.value}
								className="inline-flex items-center gap-2 p-2 text-[.8rem] border-2 border-blue-950 rounded-lg bg-blue-950 font-bold"
							>
								{foundOption.label}
								<ImCross
									className="text-red-400 cursor-pointer"
									onClick={() => handleRemove(foundOption)}
								/>
							</div>
						)
					);
				})}
			</div>
		</div>
	);
};

export default Dropdown;
