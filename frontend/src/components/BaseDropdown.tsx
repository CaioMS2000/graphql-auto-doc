import React, { useState } from "react";

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
				className="bg-gray-200 px-4 py-2 rounded-md text-gray-700"
			>
				Selecionar Opções
			</button>

			{isOpen && (
				<div className="absolute top-0 left-0 z-10 w-full mt-2 bg-white rounded-md shadow-md">
					<div className="p-4">
						<input
							type="text"
							placeholder="Pesquisar..."
							className="border rounded-md p-2 mb-4 w-full"
						/>

						{options.map((option) => (
							<div
								key={option.value}
								className="flex items-center justify-between p-2 mb-1 border rounded-md cursor-pointer hover:bg-gray-100"
								onClick={() => handleSelect(option)}
							>
								<span
									className={
										selectedOptions.includes(option.value)
											? "text-blue-600"
											: "text-gray-700"
									}
								>
									{option.label}
								</span>

								{selectedOptions.includes(option.value) && (
									<svg
										className="w-4 h-4 fill-current text-blue-600"
										viewBox="0 0 20 20"
									>
										<path d="M9.016 11.951L13.006 7.841a.996.996 0 1 1 1.414 1.414l-4.99 4.99a.996.996 0 0 1-1.414 0z" />
									</svg>
								)}
							</div>
						))}
					</div>
					<button
						onClick={handleClose}
						className="absolute top-0 right-0 p-2 rounded-md text-gray-700"
					>
						X
					</button>
				</div>
			)}

			<p>
				Opções Selecionadas:{" "}
				{selectedOptions
					.map((option) => {
						const foundOption = options.find(
							(o) => o.value === option
						);
						return foundOption ? foundOption.label : "";
					})
					.join(", ")}
			</p>
		</div>
	);
};

export default App;
