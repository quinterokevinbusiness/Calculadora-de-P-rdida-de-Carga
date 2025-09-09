
import React from 'react';
import type { PipeParams, FluidParams } from '../types';
import { MATERIALS } from '../constants';

interface InputFormProps {
    pipeParams: PipeParams;
    fluidParams: FluidParams;
    onPipeParamsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFluidParamsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onMaterialChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onCalculate: () => void;
}

const InputField: React.FC<{ label: string; name: string; value: number; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; unit: string; min?: number; step?: string; }> = ({ label, name, value, onChange, unit, min = 0, step = "any" }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-slate-300 mb-1">
            {label}
        </label>
        <div className="relative">
            <input
                type="number"
                id={name}
                name={name}
                value={value}
                onChange={onChange}
                min={min}
                step={step}
                className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 pr-20"
                required
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-slate-400">
                {unit}
            </span>
        </div>
    </div>
);

const InputForm: React.FC<InputFormProps> = ({ pipeParams, fluidParams, onPipeParamsChange, onFluidParamsChange, onMaterialChange, onCalculate }) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onCalculate();
    };

    return (
        <form onSubmit={handleSubmit} className="bg-slate-800/50 p-6 rounded-xl shadow-lg space-y-8">
            <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white border-b-2 border-slate-600 pb-2">Parámetros de la Tubería</h2>
                <InputField label="Longitud de la Tubería" name="length" value={pipeParams.length} onChange={onPipeParamsChange} unit="m" />
                <InputField label="Diámetro Interno" name="diameter" value={pipeParams.diameter} onChange={onPipeParamsChange} unit="mm" />
                <div>
                     <label htmlFor="material" className="block text-sm font-medium text-slate-300 mb-1">
                        Material de la Tubería
                    </label>
                    <select
                        id="material"
                        name="material"
                        onChange={onMaterialChange}
                        value={pipeParams.roughness}
                        className="w-full bg-slate-800 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                    >
                        {MATERIALS.map(material => (
                            <option key={material.name} value={material.roughness}>
                                {material.name}
                            </option>
                        ))}
                    </select>
                </div>
                 <InputField label="Rugosidad Absoluta" name="roughness" value={pipeParams.roughness} onChange={onPipeParamsChange} unit="mm" step="0.0001" />
            </div>

            <div className="space-y-6">
                 <h2 className="text-xl font-semibold text-white border-b-2 border-slate-600 pb-2">Parámetros del Fluido</h2>
                 <InputField label="Caudal" name="flowRate" value={fluidParams.flowRate} onChange={onFluidParamsChange} unit="L/s" />
                 <InputField label="Viscosidad Cinemática" name="kinematicViscosity" value={fluidParams.kinematicViscosity} onChange={onFluidParamsChange} unit="cSt" step="0.001" />
                 <InputField label="Densidad" name="density" value={fluidParams.density} onChange={onFluidParamsChange} unit="kg/m³" />
            </div>

            <button type="submit" className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold py-3 px-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                Calcular
            </button>
        </form>
    );
};

export default InputForm;
