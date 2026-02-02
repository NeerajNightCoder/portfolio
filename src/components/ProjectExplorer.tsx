import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowLeft, ArrowRight, RotateCw, Loader2 } from 'lucide-react';

interface ProjectExplorerProps {
    name: string;
    url: string;
    color: string;
}

const ProjectExplorer: React.FC<ProjectExplorerProps> = ({ name, url, color }) => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
    }, [url]);

    return (
        <div className="w-full max-w-7xl mx-auto bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-indigo-500/5 dark:shadow-black/40 flex flex-col h-[750px] relative border-b-4 border-gray-100/50 dark:border-gray-800/50 transition-colors duration-500">
            {/* Browser Top Bar */}
            <div className="bg-white dark:bg-gray-900 px-6 py-4 flex items-center gap-6 border-b border-gray-50 dark:border-gray-800 z-30 transition-colors duration-500">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700" />
                    <div className="w-3 h-3 rounded-full bg-gray-200 dark:bg-gray-700" />
                </div>

                <div className="hidden md:flex items-center gap-4 text-gray-300 dark:text-gray-600">
                    <ArrowLeft size={18} className="cursor-not-allowed opacity-30" />
                    <ArrowRight size={18} className="cursor-not-allowed opacity-30" />
                    <RotateCw
                        size={16}
                        className={`cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors ${isLoading ? 'animate-spin text-indigo-600 dark:text-indigo-400' : ''}`}
                        onClick={() => {
                            setIsLoading(true);
                            const iframe = document.getElementById('project-iframe') as HTMLIFrameElement;
                            if (iframe) iframe.src = iframe.src;
                        }}
                    />
                </div>

                <div className="flex-1 bg-gray-50 dark:bg-gray-800 rounded-2xl px-5 py-2.5 flex items-center justify-between gap-3 border border-gray-100 dark:border-gray-700 group transition-all hover:bg-white dark:hover:bg-gray-850 hover:border-indigo-100 dark:hover:border-indigo-900">
                    <div className="flex items-center gap-2 overflow-hidden">
                        <Globe size={14} className="text-gray-400 dark:text-gray-500 group-hover:text-indigo-400 dark:group-hover:text-indigo-400" />
                        <span className="text-xs font-bold text-gray-400 dark:text-gray-500 group-hover:text-gray-600 dark:group-hover:text-gray-300 truncate">
                            {url}
                        </span>
                    </div>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 bg-indigo-50 dark:bg-indigo-950/50 text-[9px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-tighter rounded-md border border-indigo-100 dark:border-indigo-900">
                        Live Preview
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-3 px-2">
                        <div className={`w-8 h-8 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 flex items-center justify-center font-black text-[10px] ${color} shadow-sm group-hover:scale-110 transition-transform`}>
                            {name[0]}
                        </div>
                        <span className="font-black text-gray-900 dark:text-white tracking-tighter uppercase text-[10px]">{name}</span>
                    </div>
                </div>
            </div>

            <div className="flex-1 overflow-hidden bg-gray-50/30 dark:bg-gray-850/30 relative">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={url}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="w-full h-full relative"
                    >
                        {isLoading && (
                            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
                                <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin mb-4" />
                                <p className="text-sm font-black text-gray-900 dark:text-white tracking-tighter uppercase">Initializing View...</p>
                                <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 mt-2 uppercase tracking-widest">Loading production environment</p>
                            </div>
                        )}
                        <iframe
                            id="project-iframe"
                            src={url}
                            className="w-full h-full border-none"
                            onLoad={() => setIsLoading(false)}
                            title={`${name} live view`}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ProjectExplorer;
