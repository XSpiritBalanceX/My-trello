import { IPomodoroRoundResponse } from "@/types/pomodoro.types";
import type { ITimerState } from "../timer.types";
import { useLoadSettings } from "./useLoadSettings";
import { useUpdateRound } from "./useUpdateRound";

type TypeUseTimerActions = ITimerState & { rounds: IPomodoroRoundResponse[] | undefined };

export function useTimerActions({
	activeRound,
	setIsRunning,
	secondsLeft,
	rounds,
	setActiveRound,
}: TypeUseTimerActions) {
	const { updateRound, isUpdateRoundPending } = useUpdateRound();
	const { workInterval } = useLoadSettings();

	const pauseHandler = () => {
		const totalSeconds = workInterval * 60 - secondsLeft;

		setIsRunning(false);

		if (activeRound?.id) {
			updateRound({
				id: activeRound?.id,
				data: {
					totalSeconds,
					isCompleted: Math.floor(totalSeconds * 60) >= workInterval,
				},
			});
		}
	};

	const playHandler = () => {
		setIsRunning(true);
	};

	const nextRoundHandler = () => {
		if (!activeRound?.id) return;

		updateRound({
			id: activeRound?.id,
			data: {
				isCompleted: true,
				totalSeconds: workInterval * 60,
			},
		});
	};

	const prevRoundHandler = () => {
		const lastCompletedRound = rounds?.findLast((el) => el.isCompleted);

		if (!lastCompletedRound?.id) return;

		updateRound({
			id: lastCompletedRound?.id,
			data: {
				isCompleted: false,
				totalSeconds: 0,
			},
		});

		setActiveRound(lastCompletedRound);
	};

	return { isUpdateRoundPending, pauseHandler, playHandler, nextRoundHandler, prevRoundHandler };
}
