import { timeBlockService } from "@/services/time-block.service";
import type { TypeTimeBlockFormState } from "@/types/time-block.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateTimeBlock() {
	const queryClient = useQueryClient();

	const { mutate: updateTimeBlock } = useMutation({
		mutationKey: ["update time-block"],
		mutationFn: ({ id, data }: { id: string; data: TypeTimeBlockFormState }) =>
			timeBlockService.updateTimeBlock(id, data),
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ["time-blocks"] });
		},
	});

	return { updateTimeBlock };
}
