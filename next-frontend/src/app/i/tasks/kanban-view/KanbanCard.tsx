import type { ITaskResponse, TypeTaskFormState } from "@/types/task.types";
import type { Dispatch, SetStateAction } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTaskDebounce } from "../hooks/useTaskDebounce";
import cn from "clsx";
import { GripVertical, Loader, Trash } from "lucide-react";
import { DatePicker } from "@/components/ui/task-edit/date-picker/DatePicker";
import { SingleSelect } from "@/components/ui/task-edit/SingleSelect";
import { useDeleteTask } from "../hooks/useDeleteTask";
import { TransparentField } from "@/components/ui/fields/TransparentField";
import { Checkbox } from "@/components/ui/checkbox/index";
import "./KanbanView.scss";

interface IKanbanCardProps {
	item: ITaskResponse;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function KanbanCard({ item, setItems }: IKanbanCardProps) {
	const { register, control, watch } = useForm<TypeTaskFormState>({
		defaultValues: {
			name: item.name,
			isCompleted: item.isCompleted,
			createdAt: item.createdAt,
			priority: item.priority,
		},
	});

	useTaskDebounce({ watch, itemId: item.id });

	const { deleteTask, isDeletePending } = useDeleteTask();

	return (
		<div className={cn("card", watch("isCompleted") ? "completed" : "", "animation-opacity")}>
			<div className="cardHeader">
				<button aria-describedby="todo-item">
					<GripVertical className="grip" />
				</button>
				<Controller
					control={control}
					name="isCompleted"
					render={({ field: { value, onChange } }) => (
						<Checkbox
							onChange={onChange}
							checked={value}
						/>
					)}
				/>
				<TransparentField {...register("name")} />
			</div>
			<div className="cardBody">
				<Controller
					control={control}
					name="createdAt"
					render={({ field: { value, onChange } }) => (
						<DatePicker
							onChange={onChange}
							value={value || ""}
						/>
					)}
				/>
				<Controller
					control={control}
					name="priority"
					render={({ field: { value, onChange } }) => (
						<SingleSelect
							data={["high", "medium", "low"].map((el) => ({ value: el, label: el }))}
							onChange={onChange}
							value={value || ""}
						/>
					)}
				/>
			</div>
			<div className="cardActions">
				<button
					onClick={() => (item.id ? deleteTask(item.id) : setItems((prev) => prev?.slice(0, -1)))}
					className="opacity-50 transition-opacity hover:opacity-100"
				>
					{isDeletePending ? <Loader size={15} /> : <Trash size={15} />}
				</button>
			</div>
		</div>
	);
}
