import { DragEndEvent, KeyboardSensor, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import type { Dispatch, SetStateAction } from "react";
import type { ITimeBlockResponse } from "@/types/time-block.types";
import { timeBlockService } from "@/services/time-block.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useTimeBlockDnd(
	items: ITimeBlockResponse[] | undefined,
	setItems: Dispatch<SetStateAction<ITimeBlockResponse[] | undefined>>,
) {
	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor));

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationKey: ["update order time block"],
		mutationFn: (ids: string[]) => timeBlockService.updateOrderTimeBlock(ids),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["time-blocks"] });
		},
	});

	const handleDragEnd = (e: DragEndEvent) => {
		const { active, over } = e;

		if (active.id !== over?.id && items) {
			const oldIndex = items.findIndex((el) => el.id === active.id);
			const newIndex = items.findIndex((el) => el.id === (over?.id || ""));

			if (oldIndex !== -1 && newIndex !== -1) {
				const newItems = arrayMove(items, oldIndex, newIndex);
				setItems(newItems);
				mutate(newItems.map((el) => el.id));
			}
		}
	};

	return { handleDragEnd, sensors };
}
