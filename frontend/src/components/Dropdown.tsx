import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { ImCross, ImList } from "react-icons/im";

interface Option {
	value: string;
	label: string;
}

const App: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
	const [options] = useState<Option[]>([
		{ value: "option-1", label: "Opção 1" },
		{ value: "option-2", label: "Opção 2" },
		{ value: "option-3", label: "Opção 3" },
	]);

	const handleSelect = (option: Option) => {
		const newSelectedOptions = selectedOptions.includes(option.value)
			? selectedOptions.filter((o) => o !== option.value)
			: [...selectedOptions, option.value];
		setSelectedOptions(newSelectedOptions);
	};

	const handleRemove = (option: Option) => {
		const flag = selectedOptions.includes(option.value);

		if (flag) {
			const filtered = selectedOptions.filter((o) => {

				const res = o !== option.value
				return res
			});
			setSelectedOptions(filtered);
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
						<div className="px-4 py-1 flex flex-col gap-2">
							{options.map((option) => {
								const isSelected = selectedOptions.includes(
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
										{selectedOptions.includes(
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

			<div className="mt-1 flex flex-wrap gap-2 max-w-72">
				{/* Opções Selecionadas:{" "} */}
				{selectedOptions.map((option) => {
					const foundOption = options.find((o) => o.value === option);
					return (
						foundOption && (
							<div
								key={foundOption.value}
								className="inline-flex items-center gap-2 p-2 text-[.8rem] border-2 border-blue-600 rounded-lg bg-blue-600 font-bold"
							>
								{foundOption.label}
								<ImCross
									className="text-red-400 cursor-pointer"
									onClick={() =>
										handleRemove(foundOption)
									}
								/>
							</div>
						)
					);
				})}
			</div>
		</div>
	);
};

export default App;
