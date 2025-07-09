import { Loader } from "@/components/ui/Loader";
import { useTimeBlockDnd } from "./hooks/useTimeBlockDnd";
import { useTimeBlocks } from "./hooks/useTimeBlocks";
import { calcHoursLeft } from "./calc-hours-left";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TimeBlock } from "./TimeBlock";
import "./TimeBlocking.scss";

export function TimeBlockingList() {
	const { items, setItems, isLoading } = useTimeBlocks();
	const { handleDragEnd, sensors } = useTimeBlockDnd(items, setItems);

	if (isLoading) return <Loader />;

	const hoursLeft = calcHoursLeft(items).hoursLeft;

	return (
		<div>
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}
			>
				<div className="list">
					<SortableContext
						items={items || []}
						strategy={verticalListSortingStrategy}
					>
						{items?.length ? (
							items?.map((el) => (
								<TimeBlock
									key={el.id}
									item={el}
								/>
							))
						) : (
							<div>Add the first time-block on the right</div>
						)}
					</SortableContext>
				</div>
			</DndContext>
			<div>{hoursLeft > 0 ? `${hoursLeft} hours out of 24 left for sleep` : "No hours left for sleep"}</div>
		</div>
	);
}
