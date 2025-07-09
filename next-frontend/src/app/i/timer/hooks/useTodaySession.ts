import { pomodoroService } from "@/services/pomodoro.service";
import { IPomodoroRoundResponse } from "@/types/pomodoro.types";
import { useQuery } from "@tanstack/react-query";
import { Dispatch, SetStateAction, use, useEffect } from "react";

interface IUseTodaySession {
	setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>;
	setSecondsLeft: Dispatch<SetStateAction<number>>;
	workInterval: number;
}

export function useTodaySession({ setActiveRound, setSecondsLeft, workInterval }: IUseTodaySession) {
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
				setSecondsLeft(workInterval - activeRound.totalSeconds);
			}
		}
	}, [isSuccess, rounds]);

	return { sessionResponse, isLoading, refetch, isSuccess };
}
