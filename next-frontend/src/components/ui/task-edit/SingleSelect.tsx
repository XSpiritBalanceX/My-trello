import cn from "clsx";
import { X } from "lucide-react";
import { Badge } from "../Badge";
import { useOutside } from "@/hooks/useOutside";

export interface IOption {
	label: string;
	value: string;
}

interface ISingleSelectProps {
	data: IOption[];
	onChange: (value: string) => void;
	value: string;
	isColorSelect?: boolean;
}

export function SingleSelect({ data, onChange, value, isColorSelect }: ISingleSelectProps) {
	const { ref, isShow, setIsShow } = useOutside(false);
	const getValue = () => data.find((el) => el.value === value)?.value;

	return (
		<div
			className={cn("relative min-w-36", { "w-max": isColorSelect })}
			ref={ref}
		>
			<button
				onClick={(e) => {
					e.preventDefault();
					setIsShow(!isShow);
				}}
			>
				{getValue() ? (
					<Badge
						variant={value}
						className="capitalize"
						style={isColorSelect ? { backgroundColor: value } : {}}
					>
						{getValue()}
					</Badge>
				) : (
					<Badge>Click for select</Badge>
				)}
			</button>
			{value && (
				<button
					className="absolute top-0 right-0 opacity-30 hover:opacity-100 transition-opacity"
					onClick={(e) => {
						e.preventDefault();
						onChange("");
					}}
				>
					<X size={14} />
				</button>
			)}
			{isShow && (
				<div
					className="absolute w-full p-2.5 left-0 slide bg-black border border-white/40 z-10 shadow rounded-lg"
					style={{ top: "calc(100% + .5rem)" }}
				>
					{data.map((el) => (
						<button
							key={el.value}
							onClick={(e) => {
								e.preventDefault();
								onChange(el.value);
								setIsShow(false);
							}}
							className="block mb-4 last:mb-0 capitalize rounded-lg"
							style={isColorSelect ? { backgroundColor: el.value } : {}}
						>
							<Badge variant={el.value}>{el.label}</Badge>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
