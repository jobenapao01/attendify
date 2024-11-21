import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type DashboardCardProps = {
  cardTitle: string;
  total: string;
  className?: string;
};

export const DashboardCard = ({
  cardTitle,
  total,
  className,
}: DashboardCardProps) => {
  return (
    <Card className={cn("size-fit shadow-md bg-sky-100", className)}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">{cardTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <span className="text-xl font-bold">{total}</span>
      </CardContent>
    </Card>
  );
};
