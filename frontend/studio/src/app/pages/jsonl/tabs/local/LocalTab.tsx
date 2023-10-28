import { uploadService } from "../../../../services";
import { useEffect, useState } from "react";
import { If } from "../../../../@core";
import { Avatar, Card, CardActionArea, CardHeader, Grid, Typography } from "@mui/material";
import { LocalFiles } from "../../../../services/UploadService";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

export const LocalTab = () => {
  const { localFiles } = uploadService()
  const [data, setData] = useState<LocalFiles | null>(null)

  useEffect(() => {
    localFiles().then((res) => {
      setData(res)
    }).catch((error) => {
      console.error(error)
    })
  }, []);

  return (<>
    <Typography sx={{ my: 2 }} variant="h5">
      Local files
    </Typography>
    <Typography
      sx={{ my: "20px" }}
      variant="body2"
      component="div">
      The next files still not send to OpenAI services
    </Typography>
    <If condition={data !== null}>
      <Grid container spacing={2}>
        {data?.files.map((e, i) => (
          <Grid key={i} item xs={12} md={6}>
            <Card>
              <CardActionArea>
                <CardHeader
                  avatar={
                    <Avatar>
                      <InsertDriveFileIcon/>
                    </Avatar>
                  }
                  title={e.name}
                />
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </If>
  </>)
}