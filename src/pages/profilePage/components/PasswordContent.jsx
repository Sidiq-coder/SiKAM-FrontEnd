import { useRef, useEffect } from 'react';
import { KeyRound } from 'lucide-react';
export const PasswordContent = () => {
	const inputRef = useRef(null);

	useEffect(() => {
		inputRef.current?.focus(); // fokus saat komponen muncul
	}, []);

	return (
		<div className="p-8 bg-white h-full">
			<h1 className="font-bold text-2xl capitalize">password</h1>

			<div>
				<h3 className="mt-4 w-full border-0 border-b-2 border-gray-300 text-[#909090] opacity-60">Reset Password</h3>
			</div>

			<section id="password">
				<div className="mt-4">
					<label htmlFor="old">
						Password Lama<span className="text-[#EE4848]">*</span>
					</label>
					<div className=" border-[1.5px] border-[#909090] opacity-60 rounded-[.5rem] focus-within:opacity-100 transition-all p-2 flex items-center gap-2">
						<KeyRound className="w-6 h-6 text-[#909090]" />
						<input id="old" type="text" placeholder="Password" className="outline-none w-full" ref={inputRef} />
					</div>
				</div>

				<div className="my-4">
					<div className="grid grid-cols-2 gap-4">
						<div className="mt-4">
							<label htmlFor="old">
								Password<span className="text-[#EE4848]">*</span>
							</label>
							<div className=" border-[1.5px] border-[#909090] opacity-60 rounded-[.5rem] focus-within:opacity-100 transition-all p-2 flex items-center gap-2">
								<KeyRound className="w-6 h-6 text-[#909090]" />
								<input id="old" type="text" placeholder="Password" className="outline-none w-full" ref={inputRef} />
							</div>
						</div>

						<div className="mt-4">
							<label htmlFor="old">
								Konfirmasi Password<span className="text-[#EE4848]">*</span>
							</label>
							<div className=" border-[1.5px] border-[#909090] opacity-60 rounded-[.5rem] focus-within:opacity-100 transition-all p-2 flex items-center gap-2">
								<KeyRound className="w-6 h-6 text-[#909090]" />
								<input id="old" type="text" placeholder="Password" className="outline-none w-full" ref={inputRef} />
							</div>
						</div>
					</div>
					<p className="text-gray text-[.6rem] mt-1">Password Anda harus memiliki minimal 8 karakter dan menyertakan huruf besar, huruf kecil, angka, serta karakter khusus.</p>
				</div>

				<button className="bg-[#0E50A0] text-xs text-white rounded-[.4rem] p-3 hover:opacity-80 cursor-pointer transition-delay-500 transition-all">Reset Password</button>
			</section>
		</div>
	);
};
