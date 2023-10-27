import { uploadService } from "../../../../services";
import { useEffect, useState } from "react";

export const LocalTab = () => {
  const { localFiles } = uploadService()
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    localFiles().then((res) => {
      setData(res)
    }).catch((error) => {
      console.error(error)
    })
  }, []);

  return (<>
    <h5>Local files</h5>
    {data &&
      <pre>
      {JSON.stringify(data, null , 2)}
      </pre>
    }
  </>)
}