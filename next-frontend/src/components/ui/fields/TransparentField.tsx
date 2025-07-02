import cn from "clsx";
import { type InputHTMLAttributes, forwardRef } from "react";

type TTransparentField = InputHTMLAttributes<HTMLInputElement>;

export const TransparentField = forwardRef<HTMLInputElement, TTransparentField>(({ className, ...rest }, ref) => {
	return (
		<input
			className={cn("bg-transparent border-none focus:outline-0 focus:shadow-transparent w-full", className)}
			ref={ref}
			{...rest}
		/>
	);
});

TransparentField.displayName = "TransparentField";
