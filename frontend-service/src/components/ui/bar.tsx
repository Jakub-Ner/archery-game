
interface BarProps {
    currentValue: number;
    maxValue: number;
    computeBarColor?: (percentage: number) => string;
    label?: string;
    labelColor?: string;
    barWidth?: number;
    barHeight?: number;
    labelSize?: number;
    minWidth?: number;
}

export default function Bar({ 
    currentValue, 
    maxValue,
    computeBarColor,
    label,
    labelColor = "bg-red-600",
    barWidth = 34,
    barHeight = 4,
    labelSize = 4,
    minWidth = 1
}: BarProps) {
    const currentPercentage = (currentValue / maxValue) * 100;
    
    const calculateWidth = () => {
        if (currentValue === 0) return 0;
        
        const pixelWidth = (currentPercentage / 100) * barWidth;
        
        return pixelWidth < minWidth && currentValue > 0 
            ? `${minWidth}px` 
            : `${currentPercentage}%`;
    };

    const barColor = () => {
        if (computeBarColor) {
            return computeBarColor(currentPercentage);
        }
        // Default
        return currentPercentage > 50 ? 'bg-green-800' : 'bg-red-500';
    };

    return (
        <div className="flex items-center" style={{ height: `${barHeight + 2}px` }}>
            {label && (
                <div 
                    className={`flex items-center justify-center rounded-full ${labelColor} text-white font-pixel`}
                    style={{ 
                        width: `${labelSize*2}px`,
                        height: `${labelSize}px`,
                        fontSize: `${Math.max(3, labelSize * 0.6)}px`,
                        marginRight: `1px`
                    }}
                >
                    {label}
                </div>
            )}
            <div 
                className="relative bg-black rounded-sm overflow-hidden"
                style={{ 
                    width: `${barWidth}px`,
                    height: `${barHeight}px`
                }}
            >
                {currentValue === 0 ? (
                    <div 
                        className="absolute flex justify-center w-full h-full items-center text-white"
                        style={{ fontSize: `${Math.max(4, barHeight * 0.7)}px` }}
                    >
                        -
                    </div>
                ) : (
                    <div
                        className={`${barColor()} absolute rounded-sm flex justify-center items-center text-white transition-all duration-300 ease-out`}
                        style={{ 
                            width: calculateWidth(), 
                            height: `${barHeight}px`,
                            fontSize: `${Math.max(6, barHeight * 0.7)}px`
                        }}
                    >
                        {/* {Math.floor(currentPercentage)}% */}
                    </div>
                )}
            </div>
        </div>
    );
}