import { useEffect, useState } from "react";
import { finetuneService } from "../../../../services";
import { useParams } from "react-router-dom";

export const LogsTab = () => {
  const [data, setData] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { events } = finetuneService()
  const onInit = async () => {
    setLoading(true)
    // setData(null)
    try {
      const res = await events(params["id"]!!)
      setData(res)
      // setData(res)
    } catch (e) {
      // setData(null)
    }
    setLoading(false)
  }
  useEffect(() => {
    onInit().then()
  }, []);

  return (<>
    {data !== null &&
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
    }

  </>)
}