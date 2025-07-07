import type { ITaskResponse } from "@/types/task.types";
import type { Dispatch, SetStateAction } from "react";
import "./KanbanView.scss";

interface IKanbanAddCardInputProps {
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
	filterDate?: string;
}

export function KanbanAddCardInput({ setItems, filterDate }: IKanbanAddCardInputProps) {
	const addCard = () => {
		setItems((prev) => {
			if (!prev) return;

			return [...prev, { id: "", name: "", isCompleted: false, createdAt: filterDate }];
		});
	};

	return (
		<div className={"mt-5"}>
			<button
				className="italic opacity-40 text-sm"
				onClick={addCard}
			>
				Add task...
			</button>
		</div>
	);
}
