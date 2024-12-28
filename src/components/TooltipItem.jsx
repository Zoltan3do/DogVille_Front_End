/* eslint-disable react/prop-types */
function TooltipItem({ children, tooltipsText }) {
    return (
        <div className="w-full sm:w-1/2 lg:w-1/4">
            <div className="mb-5">
                <div className="group relative inline-block">
                    <button className="inline-flex rounded px-[18px] py-2 text-base font-semibold text-primary-color bg-slate-400">
                        {children}
                    </button>
                    <div
                        className={`absolute bottom-full left-1/2 z-20 mb-3 -translate-x-1/2 whitespace-nowrap rounded bg-black px-4 py-[6px] text-sm font-semibold text-white opacity-0 group-hover:opacity-100`}
                    >
                        <span
                            className={`absolute bottom-[-3px] left-1/2 -z-10 h-2 w-2 -translate-x-1/2 rotate-45 rounded-sm bg-black`}
                        ></span>
                        {tooltipsText}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TooltipItem;
