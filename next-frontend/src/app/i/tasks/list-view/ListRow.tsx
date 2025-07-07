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
import "./ListView.scss";

interface IListRowProps {
	item: ITaskResponse;
	setItems: Dispatch<SetStateAction<ITaskResponse[] | undefined>>;
}

export function ListRow({ item, setItems }: IListRowProps) {
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
		<div className={cn("row", watch("isCompleted") ? "completed" : "", "animation-opacity")}>
			<div>
				<span className="inline-flex items-center gap-2.5 w-full">
					<button aria-describedby="todo-item">
						<GripVertical className={"grip"} />
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
				</span>
			</div>
			<div>
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
			</div>
			<div className="capitalize">
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
			<div>
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
