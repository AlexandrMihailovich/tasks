import { TaskKanban } from "@/features/task-kanban/ui/TaskKanban";
import { TaskList } from "@/features/task-list/ui/TaskList";
import { ViewSwitcher } from "@/features/view-switcher/ui/ViewSwitcher";
import Image from "next/image";

export default function Home() {

  return (
    <>
      <ViewSwitcher />
      <TaskKanban />
    </>
  );
}
