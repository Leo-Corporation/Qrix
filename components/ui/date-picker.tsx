"use client";

import * as React from "react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar16Regular } from "@fluentui/react-icons";
import useTranslation from "next-translate/useTranslation";

export function DatePicker(props: { setDate: Function }) {
  const [date, setDate] = React.useState<Date>();
  const { t } = useTranslation("common");
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "justify-start border border-slate-300 text-left font-normal dark:border-slate-600",
            !date && "text-muted-foreground",
          )}
        >
          <Calendar16Regular className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{t("select-date")}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 dark:border-slate-600">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => {
            setDate(d);
            props.setDate(`${formatDate(d)}`);
          }}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
function formatDate(date: Date | undefined) {
  if (!date) return "";
  var year = date.getFullYear();
  var month = (1 + date.getMonth()).toString().padStart(2, "0");
  var day = date.getDate().toString().padStart(2, "0");

  return year + month + day;
}
