"use client";
import { DragDropContext } from "@hello-pangea/dnd";
import { COLUMNS } from "../columns.data";
import { useTaskDnd } from "../hooks/useTaskDnd";
import { useTasks } from "../hooks/useTasks";
import { KanbanColumn } from "./KanbanColumn";
import "./KanbanView.scss";

export function KanbanView() {
	const { items, setItems } = useTasks();
	const { onDragEnd } = useTaskDnd();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={"board"}>
				{COLUMNS.map((col) => (
					<KanbanColumn
						key={col.value}
						items={items}
						label={col.label}
						value={col.value}
						setItems={setItems}
					/>
				))}
			</div>
		</DragDropContext>
	);
}
