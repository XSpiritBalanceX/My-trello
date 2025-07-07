import type { ITaskResponse } from "@/types/task.types";
import type { Dispatch, SetStateAction } from "react";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { FILTERS } from "../columns.data";
import { filterTasks } from "../filter-tasks";
import { ListAddRowInput } from "./ListAddRowInput";
import { ListRow } from "./ListRow";
import "./LastView.scss";

interface IListRowParentProps {
	value: string;
	label: string;
	items: ITaskResponse[] | undefined;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListRowParent({ value, label, items, setItems }: IListRowParentProps) {
	return (
		<Droppable droppableId={value}>
			{(provided) => (
				<div
					ref={provided.innerRef}
					{...provided.droppableProps}
				>
					<div className={"colHeading"}>
						<div className="w-full">{label}</div>
					</div>

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
									className="z-[4] relative"
								>
									<ListRow
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
						<ListAddRowInput
							setItems={setItems}
							filterDate={FILTERS[value] ? FILTERS[value].format() : undefined}
						/>
					)}
				</div>
			)}
		</Droppable>
	);
}
