import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Info, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import ProjectExplorer from '../components/ProjectExplorer';

const projectData: Record<string, any> = {
    capes: {
        name: 'Capes.app',
        url: 'https://capes.app',
        color: 'from-indigo-600 to-indigo-700',
        brandColor: 'text-indigo-600',
        bgColor: 'bg-indigo-50/30',
        description: 'An all-in-one platform for creators to build their own economy. Capes provides tools for audience management, automated monetization, and engagement tracking.',
        stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis'],
        screenshots: [
            {
                title: 'Analytics Dashboard',
                description: 'Comprehensive overview of audience growth and revenue streams.',
                image: '/home/neeraj/.gemini/antigravity/brain/dfa467c5-08bb-4b84-a2d8-a0873063a638/capes_dashboard_mockup_1770056449854.png'
            },
            {
                title: 'Engagement Metrics',
                description: 'Deep dive into fan interaction and community health.',
                image: '/home/neeraj/.gemini/antigravity/brain/dfa467c5-08bb-4b84-a2d8-a0873063a638/capes_engagement_mockup_1770056477044.png'
            }
        ]
    },
    zennbox: {
        name: 'Zennbox.app',
        url: 'https://www.zennbox.app',
        color: 'from-emerald-600 to-emerald-700',
        brandColor: 'text-emerald-600',
        bgColor: 'bg-emerald-50/30',
        description: 'Zennbox acts as your digital second brain. Using advanced AI, it helps you capture information from anywhere and organizes it automatically so you never lose a great idea again.',
        stack: ['Next.js', 'OpenAI API', 'Vector DB', 'Tailwind', 'Supabase'],
        screenshots: [
            {
                title: 'AI Intelligence Hub',
                description: 'Unified search and capture interface for your digital life.',
                image: '/home/neeraj/.gemini/antigravity/brain/dfa467c5-08bb-4b84-a2d8-a0873063a638/zennbox_interface_mockup_1770056450670.png'
            },
            {
                title: 'Knowledge Graph',
                description: 'Visualizing the neural connections between your notes and ideas.',
                image: '/home/neeraj/.gemini/antigravity/brain/dfa467c5-08bb-4b84-a2d8-a0873063a638/zennbox_graph_mockup_1770056494221.png'
            }
        ]
    }
};

const ProjectDetail = () => {
    const { id } = useParams<{ id: string }>();
    const project = id ? projectData[id] : null;
    const { theme, toggleTheme } = useTheme();

    if (!project) {
        return (
            <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 flex flex-col items-center justify-center p-6 text-center">
                <h1 className="text-4xl font-black mb-4">Project Not Found</h1>
                <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:underline font-bold">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900 pb-32 transition-colors duration-500">
            {/* Header */}
            <nav className="p-6 border-b border-gray-100 dark:border-gray-800 sticky top-0 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md z-30 transition-colors duration-500">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-2 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white transition-all group font-bold">
                        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to Work</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-xl bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all border border-gray-100 dark:border-gray-700 shadow-sm relative overflow-hidden"
                            aria-label="Toggle Theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.div
                                    key={theme}
                                    initial={{ y: -20, opacity: 0, rotate: -90 }}
                                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                                    exit={{ y: 20, opacity: 0, rotate: 90 }}
                                    transition={{ duration: 0.2, ease: "easeInOut" }}
                                >
                                    {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                                </motion.div>
                            </AnimatePresence>
                        </button>
                        <a href={project.url} target="_blank" rel="noreferrer" className="bg-black dark:bg-white text-white dark:text-black px-6 py-2 rounded-full text-xs font-bold flex items-center gap-2 hover:bg-gray-800 dark:hover:bg-gray-200 transition-all shadow-lg shadow-gray-200 dark:shadow-none">
                            Visit Live Site <ExternalLink size={14} />
                        </a>
                    </div>
                </div>
            </nav>

            <section className="pt-24 px-6">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 items-start">
                    {/* Info Sidebar */}
                    <div className="space-y-12 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <span className={`inline-block px-3 py-1 rounded-full ${project.bgColor} ${project.brandColor} text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-current opacity-70`}>
                                Featured Project
                            </span>
                            <h1 className="text-6xl font-black mb-8 tracking-tighter text-gray-900 dark:text-white leading-[0.9]">{project.name}</h1>
                            <p className="text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed mb-10">
                                {project.description}
                            </p>

                            <div className="space-y-6">
                                <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                    <Info size={14} /> Technologies
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {project.stack.map((item: string) => (
                                        <span key={item} className="px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Explorer View */}
                    <motion.div
                        className="lg:col-span-2"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    >
                        <div className="mb-8 flex items-center justify-between px-2">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Interactive Preview</h3>
                            <div className="flex gap-1.5">
                                {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-100 dark:bg-gray-800" />)}
                            </div>
                        </div>
                        <ProjectExplorer
                            name={project.name.split('.')[0]}
                            url={project.url}
                            color={project.brandColor}
                        />
                    </motion.div>
                </div>
            </section>

            {/* Visual Narrative Gallery */}
            <section className="py-32 px-6 border-t border-gray-100 dark:border-gray-800 mt-32">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-20">
                        <span className={`inline-block px-3 py-1 rounded-full ${project.bgColor} ${project.brandColor} text-[10px] font-black uppercase tracking-[0.2em] mb-4`}>
                            Visual Narrative
                        </span>
                        <h2 className="text-4xl font-black tracking-tight dark:text-white">Product Interface Design</h2>
                        <p className="text-gray-500 dark:text-gray-400 mt-4 max-w-2xl font-medium leading-relaxed">
                            A deep dive into the user experience and design systems built for {project.name}.
                        </p>
                    </div>

                    <div className="space-y-40">
                        {project.screenshots.map((shot: any, index: number) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-24 items-center`}
                            >
                                <div className="flex-1 w-full relative group">
                                    <div className={`absolute -inset-4 bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 blur-2xl transition-opacity duration-700`} />
                                    <div className="relative rounded-[2rem] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-2xl bg-white dark:bg-gray-900">
                                        <img
                                            src={shot.image}
                                            alt={shot.title}
                                            className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 max-w-lg space-y-6">
                                    <h3 className="text-3xl font-black tracking-tight dark:text-white">{shot.title}</h3>
                                    <div className={`w-12 h-1 bg-gradient-to-r ${project.color} rounded-full`} />
                                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed line-clamp-3">
                                        {shot.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProjectDetail;
