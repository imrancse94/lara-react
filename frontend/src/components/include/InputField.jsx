import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const InputField = ({ label, name, placeholder,type }) => {
    const { control } = useFormContext();

    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState: { error } }) => (
                <label htmlFor={name} className="block mt-4 text-sm">
                    <span className="text-gray-700 dark:text-gray-400">{label}</span>
                    <input
                        className={`block w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray form-input ${error?.message ? 'border border-red-500':''}`}
                        placeholder={placeholder}
                        type={type}
                        value={type === 'number' && field.value === 0 ? '' : field.value}
                        onChange={(event) => {
                            if (type === 'number') {
                                field.onChange(Number(event.target.value));
                            } else {
                                field.onChange(event.target.value);
                            }
                        }}

                    />
                    {error?.message && <p className='text-red-500'>{error?.message}</p>}
                </label>)
            }
        />
    );
}

export default InputField;
