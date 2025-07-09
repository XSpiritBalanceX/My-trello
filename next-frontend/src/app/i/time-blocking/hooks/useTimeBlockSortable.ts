import { UniqueIdentifier } from "@dnd-kit/core";
import { useSortable } from "@dnd-kit/sortable";
import type { CSSProperties } from "react";

export function useTimeBlockSortable(id: UniqueIdentifier) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	const style: CSSProperties = {
		transform: transform ? transform.toString() : undefined,
		transition,
	};

	return { attributes, listeners, setNodeRef, style };
}
