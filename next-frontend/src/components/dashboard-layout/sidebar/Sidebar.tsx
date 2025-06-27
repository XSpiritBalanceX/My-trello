import { COLORS } from "@/constants/color.constants";
import { GanttChartSquare } from "lucide-react";
import Link from "next/link";
import { LogoutButton } from "./LogoutButton";
import { MENU } from "./menu.data";
import { MenuItem } from "./MenuItem";

export function Sidebar() {
	return (
		<aside className="border-r border-r-gray-200/20 h-full bg-zinc-900 flex flex-col justify-between">
			<div>
				<Link
					href={"/"}
					className="flex items-center gap-2.5 px-3 py-5 border-b border-b-gray-200/20"
				>
					<GanttChartSquare
						color={COLORS.primary}
						size={38}
					/>
					<span className="text-2xl font-bold relative">My trello</span>
				</Link>
			</div>
			<div className="p-3 relative h-full">
				<LogoutButton />
				{MENU.map((el) => (
					<MenuItem
						key={el.link}
						item={el}
					/>
				))}
			</div>
			<footer className="text-sm opacity-60 font-normal text-center px-3 py-5">
				{new Date().getFullYear()} &copy; With love from{" "}
				<a
					href="https://www.linkedin.com/in/helenkhmi/"
					target="_blank"
					rel="noreferrer"
					className="text-blue-300 hover:text-blue-500 text-brand-300 transition-colors"
				>
					Helen.
				</a>
				<br />
				All rights reserved.
			</footer>
		</aside>
	);
}
