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
      className="hover:shadow-accent-trans group m-3 grid w-[350px] grid-cols-[auto,1fr,24px] items-center space-x-2 rounded-lg border border-accent-color bg-white p-5 text-black shadow-md shadow-accent-color/25 transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-color/20 dark:bg-slate-900 dark:text-white"
    >
      <p className="icon-f text-4xl text-accent-color">{props.icon}</p>
      <div>
        <h3 className="text-xl font-bold">{props.title}</h3>
        <p className="text-sm">{props.description}</p>
      </div>
      <p className="transition-all group-hover:translate-x-1">
        <ChevronRight20Regular color="#8B2DF0" />
      </p>
    </a>
  );
}
