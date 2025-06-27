import { Task } from "@/redux/slices/taskSlice";

export type SortOption = 'date-asc' | 'date-desc' | 'title' | 'status' | null | undefined;

export const sortTasks = (tasks: Task[], sortBy: SortOption) => {
    return [...tasks].sort((a, b) => {
        switch (sortBy) {
            case 'date-asc':
                return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
            case 'date-desc':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'title':
                return a.title?.localeCompare(b.title);
            case 'status':
                return a.status?.localeCompare(b.status);;
            default:
                return 0;
        }
    });
};