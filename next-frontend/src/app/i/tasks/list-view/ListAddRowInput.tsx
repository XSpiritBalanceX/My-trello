import type { ITaskResponse } from "@/types/task.types";
import type { Dispatch, SetStateAction } from "react";
import "./ListView.scss";

interface IListAddRowInputProps {
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
	filterDate?: string;
}

export function ListAddRowInput({ setItems, filterDate }: IListAddRowInputProps) {
	const addRow = () => {
		setItems((prev) => {
			if (!prev) return;

			return [...prev, { id: "", name: "", isCompleted: false, createdAt: filterDate }];
		});
	};

	return (
		<div className={"addRow"}>
			<button
				className="italic opacity-40 text-sm"
				onClick={addRow}
			>
				Add task...
			</button>
		</div>
	);
}
