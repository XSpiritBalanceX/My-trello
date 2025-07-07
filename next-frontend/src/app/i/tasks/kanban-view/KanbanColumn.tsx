import type { ITaskResponse } from "@/types/task.types";
import type { Dispatch, SetStateAction } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FILTERS } from "../columns.data";
import { filterTasks } from "../filter-tasks";
import { KanbanAddCardInput } from "./KanbanAddCardInput";
import { KanbanCard } from "./KanbanCard";
import "./KanbanView.scss";

interface IKanbanColumnProps {
	value: string;
	label: string;
	items: ITaskResponse[] | undefined;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function KanbanColumn({ value, label, items, setItems }: IKanbanColumnProps) {
	return (
		<Droppable droppableId={value}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className="column">
						<div className={"columnHeading"}>{label}</div>
						{filterTasks(items, value)?.map((el, ind) => (
							<Draggable
								key={el.id}
								draggableId={el.id}
								index={ind}
							>
								{(provided) => (
									<div
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
										className="relative"
									>
										<KanbanCard
											key={el.id}
											item={el}
											setItems={setItems}
										/>
									</div>
								)}
							</Draggable>
						))}
						{provided.placeholder}
						{value !== "completed" && !items?.some((it) => !it.id) && (
							<KanbanAddCardInput
								setItems={setItems}
								filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
							/>
						)}
					</div>
				</div>
			)}
		</Droppable>
	);
}
