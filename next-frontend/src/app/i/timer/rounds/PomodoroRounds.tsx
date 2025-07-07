import cn from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { IPomodoroRoundResponse } from "@/types/pomodoro.types";
import "./PomodoroRound.scss";

interface IPomodoroRoundsProps {
	rounds: IPomodoroRoundResponse[] | undefined;
	nextRoundHandler: () => void;
	prevRoundHandler: () => void;
	activeRound: IPomodoroRoundResponse | undefined;
}

export function PomodoroRounds({ rounds, nextRoundHandler, prevRoundHandler, activeRound }: IPomodoroRoundsProps) {
	const isCanPrevRound = rounds ? rounds.some((el) => el.isCompleted) : false;
	const isCanNextRound = rounds ? !rounds[rounds.length - 1].isCompleted : false;

	return (
		<div className="container">
			<button
				className="button"
				onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
				disabled={!isCanPrevRound}
			>
				<ChevronLeft size={23} />
			</button>
			<div className="roundsContainer">
				{rounds &&
					rounds.map((el, ind) => (
						<div
							key={ind}
							className={cn("round", {
								completed: el.isCompleted,
								active: el.id === activeRound?.id && !el.isCompleted,
							})}
						/>
					))}
			</div>
			<button
				className="button"
				onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
				disabled={!isCanNextRound}
			>
				<ChevronRight size={23} />
			</button>
		</div>
	);
}
