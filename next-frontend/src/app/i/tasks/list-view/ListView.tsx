"use client";
import { DragDropContext } from "@hello-pangea/dnd";
import { COLUMNS } from "../columns.data";
import { useTaskDnd } from "../hooks/useTaskDnd";
import { useTasks } from "../hooks/useTasks";
import { ListRowParent } from "./ListRowParent";
import "./LastView.scss";

export function ListView() {
	const { items, setItems } = useTasks();
	const { onDragEnd } = useTaskDnd();

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className={"table"}>
				<div className={"header"}>
					<div>Task name</div>
					<div>Due date</div>
					<div>Priority</div>
					<div></div>
				</div>
				<div className={"parentsWrapper"}>
					{COLUMNS.map((col) => (
						<ListRowParent
							key={col.value}
							items={items}
							label={col.label}
							value={col.value}
							setItems={setItems}
						/>
					))}
				</div>
			</div>
		</DragDropContext>
	);
}
