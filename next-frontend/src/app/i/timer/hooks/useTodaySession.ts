import { pomodoroService } from "@/services/pomodoro.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useLoadSettings } from "./useLoadSettings";
import type { ITimerState } from "../timer.types";

export function useTodaySession({ setActiveRound, setSecondsLeft }: ITimerState) {
	const { workInterval } = useLoadSettings();

	const {
		data: sessionResponse,
		isLoading,
		refetch,
		isSuccess,
	} = useQuery({
		queryKey: ["get today session"],
		queryFn: () => pomodoroService.getTodaySession(),
	});

	const rounds = sessionResponse?.data.rounds;

	useEffect(() => {
		if (isSuccess && rounds) {
			const activeRound = rounds.find((el) => !el.isCompleted);
			setActiveRound(activeRound);

			if (activeRound && activeRound?.totalSeconds !== 0) {
				setSecondsLeft(activeRound.totalSeconds);
			}
		}
	}, [isSuccess, rounds]);

	return { sessionResponse, isLoading, workInterval };
}
