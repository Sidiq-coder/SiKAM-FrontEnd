import { useState, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';
import { User, Mail, Eye, EyeOff, KeyRound, GraduationCap } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { setPageTitle } from '../../utils/titleManager';
import { schema } from './schema';

const Registration = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [uploadedFile, setUploadedFile] = useState(null);

	const {
		register,
		handleSubmit,
		formState: { errors, isValid, isSubmitting },
		setValue,
		trigger,
	} = useForm({
		resolver: zodResolver(schema),
		mode: 'onChange',
	});

	const onDrop = useCallback(
		(acceptedFiles) => {
			const file = acceptedFiles[0];
			if (file) {
				if (file.size > 5 * 1024 * 1024) {
					toast.error('Ukuran file maksimal 5MB');
					return;
				}

				const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
				if (!allowedTypes.includes(file.type)) {
					toast.error('Format file harus JPG, JPEG, atau PNG');
					return;
				}

				setUploadedFile(file);
				setValue('fotoKTM', [file]);
				trigger('fotoKTM');
				toast.success('File berhasil diupload');
			}
		},
		[setValue, trigger]
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'image/*': ['.jpeg', '.jpg', '.png'],
		},
		multiple: false,
	});

	const onSubmit = async (data) => {
		try {
			const formData = new FormData();
			formData.append('npm', data.npm);
			formData.append('email', data.email);
			formData.append('password', data.password);
			formData.append('nama', data.nama);
			formData.append('fotoKTM', uploadedFile);

			await new Promise((resolve) => setTimeout(resolve, 2000));

			toast.success('Registrasi berhasil! Silakan login.');

			setTimeout(() => {
				window.location.href = '/';
			}, 2000);
		} catch (error) {
			toast.error('Terjadi kesalahan saat registrasi');
			console.error('Registration error:', error);
		}
	};

	useEffect(() => {
		setPageTitle('/register');
	}, []);

	return (
		<div className="min-h-screen bg-[url('/images/top-blue-bg.png')] bg-cover bg-center bg-no-repeat flex items-center justify-center p-4">
			<div className="bg-white rounded-2xl shadow-2xl px-12 pt-8 pb-12 w-full max-w-4xl">
				<div className="mb-8">
					<h1 className="text-2xl font-semibold text-gray-800 mb-1">Selamat Datang</h1>
					<p className="text-gray-800">Sistem Klinik Advokasi Mahasiswa</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* NPM */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">NPM</label>
						<div className="relative">
							<GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								{...register('npm')}
								type="text"
								placeholder="NPM"
								className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.npm ? 'border-red-500' : 'border-gray-300'}`}
							/>
						</div>
						{errors.npm && <p className="text-red-500 text-sm mt-1">{errors.npm.message}</p>}
					</div>

					{/* Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
						<div className="relative">
							<KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								{...register('password')}
								type={showPassword ? 'text' : 'password'}
								placeholder="Password"
								className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
							/>
							<button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
								{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						</div>
						{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
					</div>

					{/* Email */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
						<div className="relative">
							<Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								{...register('email')}
								type="email"
								placeholder="Email"
								className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
							/>
						</div>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>

					{/* Konfirmasi Password */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Password</label>
						<div className="relative">
							<KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								{...register('confirmPassword')}
								type={showConfirmPassword ? 'text' : 'password'}
								placeholder="Konfirmasi Password"
								className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
									errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
								}`}
							/>
							<button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
								{showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
							</button>
						</div>
						{errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>}
					</div>

					{/* Nama */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
						<div className="relative">
							<User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
							<input
								{...register('nama')}
								type="text"
								placeholder="Nama"
								className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.nama ? 'border-red-500' : 'border-gray-300'}`}
							/>
						</div>
						{errors.nama && <p className="text-red-500 text-sm mt-1">{errors.nama.message}</p>}
					</div>

					{/* Upload Foto KTM */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-1">Foto KTM</label>
						<div
							{...getRootProps()}
							className={`border-2 border-dashed rounded-lg p-3 text-center cursor-pointer transition-colors ${
								isDragActive ? 'border-blue-500 bg-blue-50' : errors.fotoKTM ? 'border-red-500' : 'border-gray-300 hover:border-gray-400'
							}`}
						>
							<input {...getInputProps()} />
							<div className="flex flex-col items-center space-y-2 truncate">
								{uploadedFile ? (
									<p className="text-sm font-medium text-green-600">
										{uploadedFile.name} - <span className="text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</span>
									</p>
								) : (
									<p className="text-sm text-gray-600">{isDragActive ? 'Lepaskan file di sini' : 'Pilih file atau tarik ke sini'}</p>
								)}
							</div>
						</div>
						{errors.fotoKTM && <p className="text-red-500 text-sm mt-1">{errors.fotoKTM.message}</p>}
					</div>
				</div>

				<div className="flex justify-between mt-12">
					{/* Login Link */}
					<div className="text-center mt-6">
						<p className="text-sm text-gray-400">
							Sudah memiliki akun?{' '}
							<button onClick={() => (window.location.href = '/')} className="text-blue-600 hover:text-blue-700 font-medium">
								Login
							</button>
						</p>
					</div>

					{/* Submit Button */}
					<button
						type="button"
						onClick={handleSubmit(onSubmit)}
						disabled={!isValid || isSubmitting}
						className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-200 text-white font-medium py-2 px-6 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
					>
						{isSubmitting ? 'Mendaftar...' : 'Daftar'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default Registration;
