import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import type { ITaskResponse } from "@/types/task.types";
import { FILTERS } from "./columns.data";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const filterTasks = (tasks: ITaskResponse[] | undefined, value: string) => {
	switch (value) {
		case "today":
			return tasks?.filter((el) => dayjs(el.createdAt).isSame(FILTERS.today, "day") && !el.isCompleted);

		case "tomorrow":
			return tasks?.filter((el) => dayjs(el.createdAt).isSame(FILTERS.tomorrow, "day") && !el.isCompleted);

		case "on-this-week":
			return tasks?.filter(
				(el) =>
					!dayjs(el.createdAt).isSame(FILTERS.today) &&
					!dayjs(el.createdAt).isSame(FILTERS.tomorrow) &&
					dayjs(el.createdAt).isSameOrBefore(FILTERS["on-this-week"]) &&
					!el.isCompleted,
			);

		case "on-next-week":
			return tasks?.filter(
				(el) =>
					dayjs(el.createdAt).isAfter(FILTERS["on-this-week"]) &&
					dayjs(el.createdAt).isSameOrBefore(FILTERS["on-next-week"]) &&
					!el.isCompleted,
			);

		case "later":
			return tasks?.filter(
				(el) => (dayjs(el.createdAt).isAfter(FILTERS["on-next-week"]) || !el.createdAt) && !el.isCompleted,
			);

		case "completed":
			return tasks?.filter((el) => el.isCompleted);

		default:
			return [];
	}
};
