"use client";
import { useProfile } from "@/hooks/useProfile";
import { Loader } from "@/components/ui/Loader";

export function Statistics() {
	const { data, isLoading } = useProfile();

	return isLoading ? (
		<Loader />
	) : (
		<div className="grid grid-cols-4 gap-12 mt-7">
			{data?.statistics.length ? (
				data.statistics.map((el) => (
					<div
						key={el.label}
						className="bg-gray-500/20 rounded p-10 text-center hover:-translate-y-3 transition-transform duration-500"
					>
						<div className="text-xl">{el.label}</div>
						<div className="text-3xl font-semibold">{el.value}</div>
					</div>
				))
			) : (
				<div>Statistics not loaded!</div>
			)}
		</div>
	);
}
