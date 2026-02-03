import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLenis } from '@studio-freight/react-lenis';
import { ArrowRight, Code, Globe, Zap, Github, Linkedin, ArrowUp, Phone, Info, ExternalLink, Sun, Moon, Menu, X } from 'lucide-react';
import InfiniteMarquee from '../components/InfiniteMarquee';
import ProjectExplorer from '../components/ProjectExplorer';
import { useTheme } from '../context/ThemeContext';
import { SiReact, SiTypescript, SiNodedotjs, SiPostgresql, SiTailwindcss, SiVite, SiDocker, SiNextdotjs, SiAmazonwebservices, SiFigma } from 'react-icons/si';
import { ScrollReveal } from '../components/ScrollReveal';


const projectDetails: Record<string, any> = {
    capes: {
        name: 'Capes.app',
        url: 'https://capes.app',
        brandColor: 'text-indigo-600',
        bgColor: 'bg-indigo-50/30',
        description: 'An all-in-one platform for creators with audience management, automated monetization, and engagement tracking.',
        stack: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis']
    },
    zennbox: {
        name: 'Zennbox.app',
        url: 'https://www.zennbox.app',
        brandColor: 'text-emerald-600',
        bgColor: 'bg-emerald-50/30',
        description: 'Zennbox acts as your digital second brain. Using advanced AI, it helps you capture information from anywhere and organizes it automatically so you never lose a great idea again.',
        stack: ['Next.js', 'OpenAI API', 'Vector DB', 'Tailwind', 'Supabase']
    }
};

const projects = [
    {
        id: 'capes',
        name: 'Capes.app',
        tagline: 'Creators First',
        description: 'Empowering creators with the tools to manage, engage, and monetize their community effortlessly.',
        color: 'bg-indigo-50 border-indigo-100',
        textColor: 'text-indigo-600',
        accentColor: 'bg-indigo-600',
        icon: Globe,
        url: 'https://capes.app'
    },
    {
        id: 'zennbox',
        name: 'Zennbox.app',
        tagline: 'AI Second Brain',
        description: 'Intelligent resource management platform that organizes your digital life with AI-powered search.',
        color: 'bg-emerald-50 border-emerald-100',
        textColor: 'text-emerald-600',
        accentColor: 'bg-emerald-600',
        icon: Code,
        url: 'https://www.zennbox.app'
    }
];

const techStack = [
    { name: 'React', icon: SiReact, color: 'text-[#61DAFB]' },
    { name: 'TypeScript', icon: SiTypescript, color: 'text-[#3178C6]' },
    { name: 'Next.js', icon: SiNextdotjs, color: 'text-black' },
    { name: 'Tailwind', icon: SiTailwindcss, color: 'text-[#06B6D4]' },
    { name: 'Node.js', icon: SiNodedotjs, color: 'text-[#339933]' },
    { name: 'PostgreSQL', icon: SiPostgresql, color: 'text-[#4169E1]' },
    { name: 'Vite', icon: SiVite, color: 'text-[#646CFF]' },
    { name: 'AWS', icon: SiAmazonwebservices, color: 'text-[#FF9900]' },
    { name: 'Docker', icon: SiDocker, color: 'text-[#2496ED]' },
    { name: 'Figma', icon: SiFigma, color: 'text-[#F24E1E]' },
];

const Home = () => {
    const { theme, toggleTheme } = useTheme();
    const [activeProject, setActiveProject] = useState('capes');
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const lenis = useLenis();
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                mobileMenuOpen &&
                menuRef.current &&
                !menuRef.current.contains(event.target as Node) &&
                buttonRef.current &&
                !buttonRef.current.contains(event.target as Node)
            ) {
                setMobileMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [mobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowScrollTop(true);
            } else {
                setShowScrollTop(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        if (lenis) {
            lenis.scrollTo(0, { duration: 1.5 });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const scrollToSection = (id: string) => {
        if (lenis) {
            lenis.scrollTo(`#${id}`, { offset: 0, duration: 1.5 });
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 selection:bg-indigo-100 dark:selection:bg-indigo-900 overflow-x-hidden transition-colors duration-500">
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[45] bg-black/20 backdrop-blur-[1px] md:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Mobile Menu Overlay - High Z-Index to cover Navbar */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        ref={menuRef}
                        initial={{ y: -100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -100, opacity: 0 }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed top-0 left-0 w-full z-[60] bg-white dark:bg-gray-950 rounded-b-[2rem] shadow-2xl overflow-hidden md:hidden"
                    >
                        <div className="p-6">
                            {/* Mobile Menu Header */}
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-black text-xl tracking-tighter dark:text-white">Kr.Neeraj</span>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={toggleTheme}
                                        className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors border border-gray-100 dark:border-gray-700"
                                    >
                                        {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
                                    </button>
                                    <button
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="p-2 rounded-full bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:text-red-500 transition-colors border border-gray-100 dark:border-gray-700"
                                    >
                                        <X size={20} />
                                    </button>
                                </div>
                            </div>

                            {/* Mobile Menu Links */}
                            <div className="flex flex-col gap-6 text-center mb-8">
                                <button
                                    onClick={() => { scrollToSection('work'); setMobileMenuOpen(false); }}
                                    className="text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 py-2"
                                >
                                    Work
                                </button>
                                <button
                                    onClick={() => { scrollToSection('about'); setMobileMenuOpen(false); }}
                                    className="text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 py-2"
                                >
                                    About
                                </button>
                                <button
                                    onClick={() => { scrollToSection('contact'); setMobileMenuOpen(false); }}
                                    className="text-lg font-bold text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 py-2"
                                >
                                    Contact
                                </button>
                            </div>

                            {/* Mobile CTA */}
                            <div className="pb-4 px-4">
                                <a
                                    href="mailto:kumar.neeraj.developer@gmail.com"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex w-full justify-center bg-black dark:bg-white dark:text-black text-white px-6 py-4 rounded-xl font-bold hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                                >
                                    Say Hello
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header / Nav */}
            <nav className="fixed top-0 w-full z-50 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 px-6 py-4 transition-colors duration-500">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <button onClick={scrollToTop} className="font-black text-xl tracking-tighter hover:opacity-70 transition-opacity dark:text-white">Kr.Neeraj</button>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500 dark:text-gray-400">
                        <button onClick={() => scrollToSection('work')} className="hover:text-black dark:hover:text-white transition-colors">Work</button>
                        <button onClick={() => scrollToSection('about')} className="hover:text-black dark:hover:text-white transition-colors">About</button>
                        <button onClick={() => scrollToSection('contact')} className="hover:text-black dark:hover:text-white transition-colors">Contact</button>
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
                        <a
                            href="mailto:kumar.neeraj.developer@gmail.com"
                            className="bg-black dark:bg-white dark:text-black text-white px-6 py-3 rounded-full hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all shadow-lg shadow-indigo-200 dark:shadow-none"
                        >
                            Say Hello
                        </a>
                    </div>

                    {/* Mobile Menu Button - visible only when menu is closed basically, but covered by overlay anyway */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            ref={buttonRef}
                            onClick={() => setMobileMenuOpen(true)}
                            className="p-2 text-gray-600 dark:text-gray-300"
                        >
                            <Menu size={24} />
                        </button>
                    </div>
                </div>

                {/* Old Mobile Menu Overlay removed from here */}
            </nav>

            {/* Hero Section */}
            <section id="hero" className="pt-40 pb-20 px-6 relative overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-50/50 dark:bg-indigo-900/10 blur-[120px] rounded-full -z-10" />

                <ScrollReveal key="hero-reveal" direction="up" duration={1} distance={80}>
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="mb-10 flex justify-center">
                            <motion.div
                                animate={{ y: [0, -10, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                className="relative group"
                            >
                                <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full blur-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500" />
                                <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white dark:border-gray-900 shadow-2xl overflow-hidden ring-1 ring-gray-100 dark:ring-gray-800">
                                    <img
                                        src="/profile.png"
                                        alt="Kumar Neeraj"
                                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                                    />
                                </div>
                            </motion.div>
                        </div>

                        <div>
                            <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-8 border border-indigo-100 dark:border-indigo-800">
                                Crafting Digital Excellence
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black tracking-tight mb-8 text-gray-900 dark:text-white leading-[1.1] pb-2">
                                Building the <br />
                                <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 italic py-2">Future</span> of Web.
                            </h1>
                            <p className="text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
                                I architect high-performance digital products that blend stunning design with robust engineering. Currently innovating at the intersection of AI and Fintech.
                            </p>
                        </div>
                    </div>
                </ScrollReveal>
            </section>

            {/* Tech Marquee */}
            <ScrollReveal key="tech-marquee" direction="none" duration={1.2}>
                <section className="py-20 border-y border-gray-100 dark:border-gray-800 bg-gray-50/20 dark:bg-gray-900/20 overflow-hidden transition-colors duration-500">
                    <div className="max-w-6xl mx-auto mb-10 px-6 text-center">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500 transition-colors duration-500">technologies I master</span>
                    </div>
                    <InfiniteMarquee speed="50s" className="py-4">
                        {techStack.map((tech) => (
                            <div key={tech.name} className="flex items-center gap-6 px-16 group">
                                <tech.icon size={50} className={`${tech.color} opacity-40 group-hover:opacity-100 transition-all duration-500 grayscale group-hover:grayscale-0 scale-90 group-hover:scale-110`} />
                                <span className="text-4xl font-black tracking-tighter text-gray-300 dark:text-gray-700 group-hover:text-gray-900 dark:group-hover:text-white transition-colors duration-500">
                                    {tech.name}
                                </span>
                            </div>
                        ))}
                    </InfiniteMarquee>
                </section>
            </ScrollReveal>


            {/* Live Showcase Section */}
            <section id="work" className="py-24 px-6 bg-white dark:bg-gray-950 border-y border-gray-50 dark:border-gray-900 overflow-hidden relative transition-colors duration-500">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#f5f7ff_0%,transparent_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,#1a1c2e_0%,transparent_100%)] opacity-50 -z-10 transition-colors duration-700" />

                <div className="max-w-7xl mx-auto">
                    <ScrollReveal key="work-title" direction="up" distance={30}>
                        <div className="text-center mb-16">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600/60 dark:text-indigo-400/60 mb-4 block">Showcase</span>
                            <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white">My Works.</h2>
                        </div>
                    </ScrollReveal>

                    {/* Tab Switcher */}
                    <ScrollReveal key="project-tabs" direction="up" delay={0.2} distance={30}>
                        <div className="flex justify-center mb-16">
                            <div className="bg-gray-100 dark:bg-gray-900 p-1 rounded-lg flex relative border border-gray-200 dark:border-gray-800">
                                {projects.map((project) => (
                                    <button
                                        key={project.id}
                                        onClick={() => setActiveProject(project.id)}
                                        className={`relative z-10 px-6 md:px-12 py-2.5 text-sm font-bold transition-colors duration-300 flex-1 md:flex-none md:min-w-[150px] rounded-md ${activeProject === project.id ? 'text-black dark:text-white' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                                            }`}
                                    >
                                        {project.name}
                                        {activeProject === project.id && (
                                            <motion.div
                                                layoutId="activeTab"
                                                className="absolute inset-0 bg-white dark:bg-gray-800 rounded-md shadow-sm -z-10 border border-gray-200 dark:border-gray-700"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 items-start mb-20">
                        {/* Info Column */}
                        <div className="space-y-12">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeProject}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                >
                                    <span className={`inline-block px-3 py-1 rounded-full ${projectDetails[activeProject].bgColor} ${projectDetails[activeProject].brandColor} text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-current opacity-70`}>
                                        Currently Reviewing
                                    </span>
                                    <h2 className="text-6xl font-black mb-8 tracking-tighter text-gray-900 leading-[0.9] dark:text-white">
                                        {projectDetails[activeProject].name}
                                    </h2>
                                    <p className="text-gray-500 dark:text-gray-400 text-lg font-medium leading-relaxed mb-10 max-w-sm">
                                        {projectDetails[activeProject].description}
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                            <Info size={14} /> Technologies
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {projectDetails[activeProject].stack.map((item: string) => (
                                                <span key={item} className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 shadow-sm">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pt-12">
                                        <a
                                            href={projectDetails[activeProject].url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-3 bg-black dark:bg-white text-white dark:text-black px-8 py-4 rounded-2xl text-sm font-bold hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all shadow-xl shadow-indigo-100 dark:shadow-none group"
                                        >
                                            Visit Production Site <ExternalLink size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                        </a>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Browser Column */}
                        <div className="lg:col-span-2">
                            <ScrollReveal key="project-browser" direction="right" distance={50} delay={0.4}>
                                <div>
                                    <div className="mb-8 flex items-center justify-between px-2">
                                        <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 dark:text-gray-500">Interactive Environment</h3>
                                        <div className="flex gap-1.5">
                                            {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-gray-700" />)}
                                        </div>
                                    </div>
                                    <ProjectExplorer
                                        name={projectDetails[activeProject].name.split('.')[0]}
                                        url={projectDetails[activeProject].url}
                                        color={projectDetails[activeProject].brandColor}
                                    />
                                </div>
                            </ScrollReveal>
                        </div>
                    </div>
                </div>
            </section>

            {/* Endorsements Section */}
            <section id="about" className="py-32 px-6 bg-gray-50/50 dark:bg-gray-900/50 transition-colors duration-500">
                <div className="max-w-6xl mx-auto">
                    <ScrollReveal key="endorsements-title" direction="up">
                        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                            <div className="max-w-2xl">
                                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600/60 dark:text-indigo-400/60 mb-4 block transition-colors duration-500">Endorsements</span>
                                <h2 className="text-5xl font-black tracking-tighter text-gray-900 dark:text-white mb-6 transition-colors duration-500">Trusted by Industry Leaders.</h2>
                                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium transition-colors duration-500">Collaborating with visionary teams to build the next generation of digital products.</p>
                            </div>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                name: "Alex Rivera",
                                role: "Founder, Capes.app",
                                quote: "Neeraj is a rare talent who deeply understands both the aesthetic and technical layers of product building. His work on our core modules was transformative.",
                                avatar: "AR"
                            },
                            {
                                name: "Sarah Chen",
                                role: "Lead Engineer, Zennbox",
                                quote: "The way Neeraj handles complex architectural challenges while keeping the UI fluid and responsive is exceptional. A truly world-class developer.",
                                avatar: "SC"
                            },
                            {
                                name: "Marcus Thorne",
                                role: "Product Designer",
                                quote: "He doesn't just build features; he builds experiences. His attention to micro-interactions and performance is what sets him apart.",
                                avatar: "MT"
                            }
                        ].map((testimonial, i) => (
                            <ScrollReveal key={`testimonial-${i}`} direction="up" delay={i * 0.15}>
                                <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-500 group">
                                    <div className="flex gap-1 mb-6">
                                        {[1, 2, 3, 4, 5].map(star => <Zap key={star} size={12} className="text-amber-400 fill-amber-400" />)}
                                    </div>
                                    <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed mb-8 italic">
                                        "{testimonial.quote}"
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-indigo-50 border border-indigo-100 dark:bg-indigo-900 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-black text-xs shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                            {testimonial.avatar}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 dark:text-white text-sm">{testimonial.name}</p>
                                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Redesigned Footer */}
            <footer id="contact" className="pt-32 pb-16 px-6 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden relative transition-colors duration-500">
                {/* Decorative background element */}
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-indigo-50/30 dark:bg-indigo-900/10 blur-[120px] rounded-full -z-10 translate-x-1/2 translate-y-1/2 transition-colors duration-700" />

                <div className="max-w-7xl mx-auto">
                    {/* Top CTA Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-32">
                        <ScrollReveal key="contact-cta" direction="left" distance={80}>
                            <div className="relative overflow-visible">
                                <h2 className="text-6xl md:text-7xl font-black tracking-tight mb-8 leading-[1.3] text-gray-900 dark:text-white overflow-visible">
                                    Ready to build the <br />
                                    <span className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 italic py-8 -my-8 pr-12" style={{ WebkitBoxDecorationBreak: 'clone', boxDecorationBreak: 'clone' }}>next big thing?</span>
                                </h2>
                                <p className="text-xl text-gray-500 dark:text-gray-400 font-medium mb-10 max-w-lg">
                                    I'm currently available for freelance projects and full-time opportunities. Let's create something extraordinary together.
                                </p>
                                <a
                                    href="mailto:kumar.neeraj.developer@gmail.com"
                                    className="inline-flex items-center gap-4 bg-black dark:bg-white text-white dark:text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-indigo-600 dark:hover:bg-indigo-400 hover:shadow-2xl hover:shadow-indigo-200 dark:hover:shadow-indigo-900/40 transition-all duration-500 group"
                                >
                                    Start a Conversation
                                    <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                                </a>
                            </div>
                        </ScrollReveal>

                        <div className="flex flex-col items-center lg:items-end gap-6 pt-4 lg:pt-0">
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 dark:text-gray-500">Connectivity</span>
                            <div className="flex gap-4">
                                {[
                                    { icon: Github, url: "https://github.com/NeerajNightCoder", color: "hover:bg-black dark:hover:bg-white dark:hover:text-black", shadow: "hover:shadow-black/20 dark:hover:shadow-white/20", ink: "text-gray-900 dark:text-white", outline: "border-gray-900/10 dark:border-white/20" },
                                    { icon: Linkedin, url: "https://www.linkedin.com/in/kumar-neeraj-077b36177/", color: "hover:bg-[#0077B5]", shadow: "hover:shadow-[#0077B5]/20", ink: "text-[#0077B5]", outline: "border-[#0077B5]/20" },
                                    { icon: Phone, url: "tel:+919110166394", color: "hover:bg-[#22C55E]", shadow: "hover:shadow-[#22C55E]/20", ink: "text-[#22C55E]", outline: "border-[#22C55E]/20" },
                                ].map((social, i) => (
                                    <a
                                        key={i}
                                        href={social.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className={`w-16 h-16 rounded-2xl border ${social.outline} flex items-center justify-center ${social.ink} ${social.color} hover:text-white transition-all duration-500 shadow-sm hover:shadow-xl ${social.shadow} group overflow-hidden relative transition-colors duration-500`}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <social.icon size={24} className="relative z-10" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Navigation Columns */}
                    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 pb-24 border-b border-gray-100 dark:border-gray-800">
                        <div className="col-span-2 lg:col-span-2">
                            <span className="font-black text-2xl tracking-tighter mb-6 block dark:text-white">Kr.Neeraj</span>
                            <p className="text-gray-400 dark:text-gray-500 text-sm font-medium leading-relaxed max-w-xs">
                                Designing and engineering high-impact digital products. Focused on innovation, craftsmanship, and performance.
                            </p>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 mb-6">Work</h4>
                            <ul className="space-y-4">
                                {['Capes.app', 'Zennbox.app', 'Archive'].map(item => (
                                    <li key={item}>
                                        <a href="#" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">{item}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 dark:text-gray-600 mb-6">Contact</h4>
                            <ul className="space-y-4">
                                <li>
                                    <a href="mailto:kumar.neeraj.developer@gmail.com" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">kumar.neeraj.developer@gmail.com</a>
                                </li>
                                <li>
                                    <a href="tel:+919110166394" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">+91 9110166394</a>
                                </li>
                                <li>
                                    <a href="https://www.linkedin.com/in/kumar-neeraj-077b36177/" target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">LinkedIn</a>
                                </li>
                                <li>
                                    <a href="https://github.com/NeerajNightCoder" target="_blank" rel="noreferrer" className="text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">Github</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                            <span className="text-[10px] font-black text-gray-300 uppercase tracking-[0.2em]">© 2026 NEERAJ. ALL RIGHTS RESERVED.</span>
                            <div className="flex gap-6">
                                <a href="#" className="text-[10px] font-black text-gray-300 hover:text-gray-900 uppercase tracking-[0.2em] transition-colors">Privacy</a>
                                <a href="#" className="text-[10px] font-black text-gray-300 hover:text-gray-900 uppercase tracking-[0.2em] transition-colors">Terms</a>
                            </div>
                        </div>

                        <div />
                    </div>
                </div>
            </footer>

            {/* Floating Scroll to Top */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-10 right-10 z-50 bg-black dark:bg-white text-white dark:text-black w-14 h-14 rounded-full flex items-center justify-center shadow-2xl hover:bg-indigo-600 dark:hover:bg-indigo-400 transition-all duration-300 group ring-4 ring-black/5 dark:ring-white/5"
                    >
                        <ArrowUp size={24} className="group-hover:-translate-y-1 transition-transform" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div >
    );
};

export default Home;
