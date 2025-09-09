
import React from 'react';
import type { CalculationResult } from '../types';

interface ResultsDisplayProps {
    results: CalculationResult | null;
    isLoading: boolean;
}

const ResultItem: React.FC<{ label: string; value: string; unit: string; }> = ({ label, value, unit }) => (
    <div className="flex justify-between items-baseline py-3 px-4 bg-slate-800 rounded-lg transition-colors duration-300 hover:bg-slate-700/50">
        <span className="text-slate-400">{label}</span>
        <div className="text-right">
            <span className="text-lg font-semibold text-sky-400">{value}</span>
            <span className="ml-2 text-slate-400 text-sm">{unit}</span>
        </div>
    </div>
);

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ results, isLoading }) => {
    
    const regimeStyles = {
        Laminar: 'text-green-400 bg-green-900/50 border-green-500',
        Transición: 'text-amber-400 bg-amber-900/50 border-amber-500',
        Turbulento: 'text-red-400 bg-red-900/50 border-red-500',
    };

    const formatNumber = (num: number) => {
        if (num > 10000) return num.toExponential(2);
        if (num < 0.01 && num !== 0) return num.toExponential(2);
        return num.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 });
    };
    
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-full">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
                </div>
            );
        }

        if (!results) {
            return (
                 <div className="flex flex-col justify-center items-center h-full text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="text-lg font-medium text-slate-300">Esperando cálculo</h3>
                    <p className="text-slate-500">Ingrese sus datos y presione "Calcular".</p>
                </div>
            );
        }

        return (
            <div className="space-y-3">
                <ResultItem label="Pérdida de Carga" value={formatNumber(results.headLossMeters)} unit="m" />
                <ResultItem label="Caída de Presión" value={formatNumber(results.pressureDropBar)} unit="bar" />
                <ResultItem label="Caída de Presión (absoluta)" value={formatNumber(results.pressureDropPascal)} unit="Pa" />
                <ResultItem label="Velocidad del Fluido" value={formatNumber(results.velocity)} unit="m/s" />
                <ResultItem label="Número de Reynolds" value={formatNumber(results.reynoldsNumber)} unit="" />
                <ResultItem label="Factor de Fricción" value={formatNumber(results.frictionFactor)} unit="" />
                <div className="flex justify-between items-center py-3 px-4 bg-slate-800 rounded-lg">
                    <span className="text-slate-400">Régimen de Flujo</span>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full border ${regimeStyles[results.flowRegime]}`}>
                        {results.flowRegime}
                    </span>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-slate-800/50 p-6 rounded-xl shadow-lg h-96 flex flex-col">
            <h2 className="text-xl font-semibold text-white border-b-2 border-slate-600 pb-2 mb-4">Resultados del Cálculo</h2>
            <div className="flex-grow">
                {renderContent()}
            </div>
        </div>
    );
};

export default ResultsDisplay;
