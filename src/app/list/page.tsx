import { TaskList } from "@/features/task-list/ui/TaskList";
import { ViewSwitcher } from "@/features/view-switcher/ui/ViewSwitcher";

export default function List() {

    return (
        <>
            <ViewSwitcher />
            <TaskList />
        </>
    );
}
