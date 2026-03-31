import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const roles = [
    {
        id: 'user',
        label: 'User',
        description: 'Book services for your home or office',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        ),
        color: 'from-blue-500 to-cyan-500',
        borderActive: 'border-blue-400 bg-blue-50/50 ring-2 ring-blue-200',
    },
    {
        id: 'professional',
        label: 'Professional',
        description: 'Offer your services and grow your business',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-primary to-purple-600',
        borderActive: 'border-purple-400 bg-purple-50/50 ring-2 ring-purple-200',
    },
    {
        id: 'admin',
        label: 'Admin',
        description: 'Platform management & oversight',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
        ),
        color: 'from-amber-500 to-orange-500',
        borderActive: 'border-amber-400 bg-amber-50/50 ring-2 ring-amber-200',
    },
    {
        id: 'customer_support',
        label: 'Customer Support',
        description: 'Assist users, handle tickets, and resolve issues',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636a9 9 0 010 12.728M15.536 8.464a5 5 0 010 7.072M12 12v.01M8 21h8a2 2 0 002-2v-1a4 4 0 00-4-4h-4a4 4 0 00-4 4v1a2 2 0 002 2z" />
            </svg>
        ),
        color: 'from-teal-500 to-emerald-500',
        borderActive: 'border-teal-400 bg-teal-50/50 ring-2 ring-teal-200',
    },
];

const serviceTypes = [
    'Plumber', 'Electrician', 'Cleaner', 'Painter', 'Carpenter',
    'AC Technician', 'Beauty & Spa', 'Pest Control', 'IT Support', 'Other',
];

const supportDepartments = ['Payment', 'Technical', 'General'];

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: '',
        serviceType: '',
        supportDepartment: '',
        employeeId: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const { login, getDashboardPath } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error for this field on change
        if (errors[name]) {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleRoleSelect = (roleId) => {
        setFormData((prev) => ({
            ...prev,
            role: roleId,
            serviceType: roleId !== 'professional' ? '' : prev.serviceType,
            supportDepartment: roleId !== 'customer_support' ? '' : prev.supportDepartment,
            employeeId: roleId !== 'customer_support' ? '' : prev.employeeId,
        }));
        if (errors.role) {
            setErrors({ ...errors, role: '' });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email';
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
        if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
        else if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.role) newErrors.role = 'Please select a role';
        if (formData.role === 'professional' && !formData.serviceType) newErrors.serviceType = 'Please select a service type';
        if (formData.role === 'customer_support' && !formData.supportDepartment) newErrors.supportDepartment = 'Please select a support department';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        const submitData = { ...formData };
        if (submitData.role !== 'professional') delete submitData.serviceType;
        if (submitData.role !== 'customer_support') {
            delete submitData.supportDepartment;
            delete submitData.employeeId;
        }
        if (!submitData.employeeId) delete submitData.employeeId;
        delete submitData.confirmPassword;
        console.log('✅ Registration submitted:', submitData);

        // Auto-login after registration and redirect to dashboard
        const userData = {
            name: formData.fullName,
            email: formData.email,
            role: formData.role,
            ...(formData.role === 'professional' && { serviceType: formData.serviceType }),
            ...(formData.role === 'customer_support' && {
                supportDepartment: formData.supportDepartment,
                ...(formData.employeeId && { employeeId: formData.employeeId }),
            }),
        };
        login(userData);
        navigate(getDashboardPath(formData.role));
    };

    const inputBaseClass = 'w-full pl-11 pr-4 py-3 rounded-xl border bg-gray-50/50 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all text-sm';
    const inputErrorClass = 'border-red-300 focus:ring-red-200 focus:border-red-400';
    const inputNormalClass = 'border-gray-200';

    return (
        <div className="min-h-screen bg-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center pt-20 pb-16 px-4">
                <div className="w-full max-w-lg">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-2xl mb-4 shadow-lg shadow-secondary/25">
                            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-extrabold text-gray-900">Create Account</h1>
                        <p className="mt-2 text-gray-500">Join MyServiceHub and get started</p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xl shadow-gray-200/50 p-8">
                        <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                            {/* ── Role Selection ── */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Select Your Role <span className="text-red-400">*</span>
                                </label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    {roles.map((role) => {
                                        const selected = formData.role === role.id;
                                        return (
                                            <button
                                                key={role.id}
                                                type="button"
                                                onClick={() => handleRoleSelect(role.id)}
                                                className={`relative p-4 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer group ${selected
                                                    ? role.borderActive
                                                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 mx-auto rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white mb-2 group-hover:scale-105 transition-transform ${selected ? 'shadow-md' : ''}`}>
                                                    {role.icon}
                                                </div>
                                                <p className={`text-sm font-bold ${selected ? 'text-gray-900' : 'text-gray-600'}`}>
                                                    {role.label}
                                                </p>
                                                <p className="text-[10px] text-gray-400 mt-0.5 leading-tight hidden sm:block">
                                                    {role.description}
                                                </p>
                                                {selected && (
                                                    <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shadow-sm">
                                                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </button>
                                        );
                                    })}
                                </div>
                                {errors.role && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.role}</p>}
                            </div>

                            {/* ── Admin Warning ── */}
                            {formData.role === 'admin' && (
                                <div className="flex items-start gap-3 p-3.5 bg-amber-50 border border-amber-200 rounded-xl animate-[fadeIn_0.3s_ease]">
                                    <svg className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <div>
                                        <p className="text-sm font-semibold text-amber-800">Restricted Access</p>
                                        <p className="text-xs text-amber-600 mt-0.5">Admin registration requires verification. Your account will be reviewed before activation.</p>
                                    </div>
                                </div>
                            )}

                            {/* ── Professional Service Type ── */}
                            {formData.role === 'professional' && (
                                <div>
                                    <label htmlFor="serviceType" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                        Service Type <span className="text-red-400">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <select
                                            id="serviceType"
                                            name="serviceType"
                                            value={formData.serviceType}
                                            onChange={handleChange}
                                            className={`${inputBaseClass} ${errors.serviceType ? inputErrorClass : inputNormalClass} appearance-none cursor-pointer`}
                                        >
                                            <option value="">Choose your service type</option>
                                            {serviceTypes.map((type) => (
                                                <option key={type} value={type.toLowerCase()}>{type}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                    {errors.serviceType && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.serviceType}</p>}
                                </div>
                            )}

                            {/* ── Customer Support Fields ── */}
                            {formData.role === 'customer_support' && (
                                <div className="space-y-4 animate-[fadeIn_0.3s_ease]">
                                    {/* Support Department */}
                                    <div>
                                        <label htmlFor="supportDepartment" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Support Department <span className="text-red-400">*</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                                </svg>
                                            </div>
                                            <select
                                                id="supportDepartment"
                                                name="supportDepartment"
                                                value={formData.supportDepartment}
                                                onChange={handleChange}
                                                className={`${inputBaseClass} ${errors.supportDepartment ? inputErrorClass : inputNormalClass} appearance-none cursor-pointer`}
                                            >
                                                <option value="">Choose department</option>
                                                {supportDepartments.map((dept) => (
                                                    <option key={dept} value={dept.toLowerCase()}>{dept}</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
                                                <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                        {errors.supportDepartment && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.supportDepartment}</p>}
                                    </div>

                                    {/* Employee ID (Optional) */}
                                    <div>
                                        <label htmlFor="employeeId" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                            Employee ID <span className="text-gray-400 text-xs font-normal">(optional)</span>
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                                </svg>
                                            </div>
                                            <input
                                                id="employeeId"
                                                name="employeeId"
                                                type="text"
                                                value={formData.employeeId}
                                                onChange={handleChange}
                                                className={`${inputBaseClass} ${inputNormalClass}`}
                                                placeholder="e.g. EMP-12345"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ── Full Name ── */}
                            <div>
                                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Full Name <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className={`${inputBaseClass} ${errors.fullName ? inputErrorClass : inputNormalClass}`}
                                        placeholder="John Doe"
                                    />
                                </div>
                                {errors.fullName && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.fullName}</p>}
                            </div>

                            {/* ── Email ── */}
                            <div>
                                <label htmlFor="reg-email" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Email Address <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="reg-email"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className={`${inputBaseClass} ${errors.email ? inputErrorClass : inputNormalClass}`}
                                        placeholder="you@example.com"
                                    />
                                </div>
                                {errors.email && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.email}</p>}
                            </div>

                            {/* ── Phone ── */}
                            <div>
                                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Phone Number <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className={`${inputBaseClass} ${errors.phone ? inputErrorClass : inputNormalClass}`}
                                        placeholder="+91 98765 43210"
                                    />
                                </div>
                                {errors.phone && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.phone}</p>}
                            </div>

                            {/* ── Password ── */}
                            <div>
                                <label htmlFor="reg-password" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Password <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="reg-password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formData.password}
                                        onChange={handleChange}
                                        className={`${inputBaseClass} !pr-12 ${errors.password ? inputErrorClass : inputNormalClass}`}
                                        placeholder="Min 8 characters"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600 cursor-pointer"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            {showPassword ? (
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                            ) : (
                                                <>
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </>
                                            )}
                                        </svg>
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.password}</p>}
                            </div>

                            {/* ── Confirm Password ── */}
                            <div>
                                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-1.5">
                                    Confirm Password <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                        <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className={`${inputBaseClass} ${errors.confirmPassword ? inputErrorClass : inputNormalClass}`}
                                        placeholder="Re-enter your password"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1.5 font-medium">{errors.confirmPassword}</p>}
                            </div>

                            {/* ── Terms ── */}
                            <label className="flex items-start gap-2 cursor-pointer pt-1">
                                <input type="checkbox" className="w-4 h-4 mt-0.5 rounded border-gray-300 text-primary focus:ring-primary/30 cursor-pointer" required />
                                <span className="text-sm text-gray-500">
                                    I agree to the{' '}
                                    <a href="#" className="text-primary font-semibold hover:text-primary-dark">Terms of Service</a>
                                    {' '}and{' '}
                                    <a href="#" className="text-primary font-semibold hover:text-primary-dark">Privacy Policy</a>
                                </span>
                            </label>

                            {/* ── Submit ── */}
                            <button
                                type="submit"
                                className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white font-semibold rounded-xl shadow-md shadow-primary/25 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
                            >
                                Create Account
                            </button>
                        </form>
                    </div>

                    {/* Footer Link */}
                    <p className="text-center mt-6 text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-primary hover:text-primary-dark transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default RegisterPage;
