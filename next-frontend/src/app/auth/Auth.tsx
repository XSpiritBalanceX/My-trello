"use client";
import { IAuthForm } from "@/types/auth.types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";

export function Auth() {
	const { register, handleSubmit, reset } = useForm<IAuthForm>({ mode: "onChange" });

	const [isLoginForm, setIsLoginForm] = useState(false);

	const { push } = useRouter();

	const { mutate } = useMutation({
		mutationKey: ["auth"],
		mutationFn: (data: IAuthForm) => authService.main(isLoginForm ? "login" : "register", data),
		onSuccess() {
			toast.success("Successfully login!");
			reset();
			push(DASHBOARD_PAGES.HOME);
		},
	});

	const onSubmit = (data: IAuthForm) => {
		mutate(data);
	};

	return (
		<div className="flex min-h-screen">
			<form
				className="w-1/4 m-auto shadow bg-sidebar rounded-xl p-layout"
				onSubmit={handleSubmit(onSubmit)}
			>
				<div className="flex items-center gap-5 justify-center"></div>
			</form>
		</div>
	);
}
