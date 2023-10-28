import { Avatar, Card, CardActionArea, CardHeader } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ReactNode } from "react";

export interface SimpleCardProps {
  link: string;
  title: string;
  subtitle: string;
  icon: ReactNode;
  iconColor?: string
}

export const SimpleCard = ({
                             link,
                             title,
                             subtitle,
                             icon,
                             iconColor
                           }: SimpleCardProps) => {
  const navigate = useNavigate()
  const nav = (link: string) => {
    navigate(link)
  }
  return (<>
    <Card>
      <CardActionArea onClick={() => nav(link)}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: iconColor ?? "" }}>
              {icon}
            </Avatar>
          }
          title={title}
          subheader={subtitle}
        />
      </CardActionArea>
    </Card>
  </>)
}