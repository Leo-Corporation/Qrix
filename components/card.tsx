import { ChevronRight20Regular } from "@fluentui/react-icons";

export interface CardProps {
  title: string;
  icon: string;
  description: string;
  link: string;
}

export default function DashboardCard(props: CardProps) {
  return (
    <a
      href={props.link}
      className="group m-3 flex w-[350px] items-center space-x-2 rounded-lg border border-accent-color bg-white p-5 text-black shadow-md transition-all hover:-translate-y-1 hover:shadow-lg dark:bg-slate-900 dark:text-white"
    >
      <p className="icon-f text-4xl text-accent-color">{props.icon}</p>
      <div>
        <h3 className="text-xl font-bold">{props.title}</h3>
        <p className="text-sm">{props.description}</p>
      </div>
      <p className="transition-all group-hover:-mr-2">
        <ChevronRight20Regular color="#8B2DF0" />
      </p>
    </a>
  );
}
