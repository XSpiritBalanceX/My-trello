interface IHeadingProps {
	title: string;
}

export function Heading({ title }: IHeadingProps) {
	return (
		<div>
			<h1 className="text-3xl font-medium">{title}</h1>
			<div className="my-3 h-0.5 bg-gray-200/20 w-full" />
		</div>
	);
}
