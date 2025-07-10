"use client";
import { IAuthForm } from "@/types/auth.types";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { toast } from "sonner";
import { DASHBOARD_PAGES } from "@/config/pages-url.config";
import { Heading } from "@/components/ui/Heading";
import { Field } from "@/components/ui/fields/Field";
import { Button } from "@/components/ui/buttons/Button";

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
		onError(err: any) {
			toast.error(err?.response?.data?.message || "Oops...An error occurred");
		},
	});

	const onSubmit = (data: IAuthForm, event: any) => {
		const formEvent = event.nativeEvent as SubmitEvent;
		const buttonName = formEvent.submitter ? (formEvent.submitter as HTMLButtonElement).name : null;
		if (buttonName === "login") {
			setIsLoginForm(true);
		} else {
			setIsLoginForm(false);
		}
		mutate(data);
	};

	return (
		<div className="flex min-h-screen">
			<form
				className="w-1/3 m-auto shadow bg-gray-500/20 rounded-xl p-10 "
				onSubmit={handleSubmit(onSubmit)}
			>
				<Heading title="Auth" />
				<Field
					id="email"
					label="Email:"
					placeholder="Enter email"
					type="email"
					extra="mb-4"
					{...register("email", { required: "Email id required" })}
				/>
				<Field
					id="password"
					label="Password:"
					placeholder="Enter password"
					type="password"
					extra="mb-6"
					{...register("password", { required: "Password id required" })}
				/>
				<div className="flex items-center gap-5 justify-center">
					<Button name="login">Login</Button>
					<Button name="register">Register</Button>
				</div>
			</form>
		</div>
	);
}
