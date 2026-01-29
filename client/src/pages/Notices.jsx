import { useQuery } from '@tanstack/react-query';
import { fetchNotices } from '../api';
import { ExternalLink, Calendar } from 'lucide-react';

function Notices() {
    const { data: notices, isLoading, error } = useQuery({
        queryKey: ['notices'],
        queryFn: fetchNotices,
    });

    if (isLoading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
    );

    if (error) return (
        <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg">
            Error loading notices: {error.message}
        </div>
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight">Notices & Circulars</h1>
                <p className="text-muted-foreground">Latest updates from rmd.ac.in</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {notices.map((notice, index) => (
                    <a
                        key={index}
                        href={notice.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative flex flex-col justify-between rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md card-hover"
                    >
                        <div>
                            <div className="flex items-start justify-between">
                                <div className="p-2 bg-secondary rounded-lg text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                    <ExternalLink size={20} />
                                </div>
                                {notice.isNew && (
                                    <span className="inline-flex items-center rounded-full border border-transparent bg-accent px-2.5 py-0.5 text-xs font-semibold text-white shadow">
                                        New
                                    </span>
                                )}
                            </div>
                            <h3 className="mt-4 font-semibold leading-relaxed line-clamp-3">
                                {notice.title}
                            </h3>
                        </div>
                        <div className="mt-4 flex items-center text-xs text-muted-foreground">
                            <Calendar size={14} className="mr-1" />
                            <span>{notice.date}</span>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Notices;
