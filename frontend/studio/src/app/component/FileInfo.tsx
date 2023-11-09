import { Avatar, Box, Card, CardHeader, useTheme } from "@mui/material";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

type FileInfoProps = {
  file: File
}

export const FileInfo = ({ file }: FileInfoProps) => {
  const theme = useTheme()
  const fileSize = (size: number): string => {
    if (size < 1024) {
      return `${size} bytes`;
    } else if (size >= 1024 && size < 1048576) {
      return `${(size / 1024).toFixed(1)} KB`;
    } else if (size >= 1048576) {
      return `${(size / 1048576).toFixed(1)} MB`;
    }
    return "0"
  }
  return (<>
    <Card>
      <CardHeader
        avatar={
          <Box sx={{ position: 'relative' }}>
            <Avatar sx={{
              bgcolor: theme.palette.primary.main
            }}>
              <InsertDriveFileIcon/>
            </Avatar>
          </Box>
        }
        title={<div style={{
          overflowWrap: "anywhere",
          // wordWrap: "break-word",
          hyphens: "auto"
        }}>
          { file.name }
        </div>}
        subheader={<>
          { fileSize(file.size) }
        </>}
      />
    </Card>
  </>)
}