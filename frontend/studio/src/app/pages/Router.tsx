import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";

export const pagesRouter = () => {
  return (<>
    <Route index lazy={async () => {
      const { Home, homeLoader } = await import("./home/Home")
      return {
        loader: homeLoader,
        Component: Home
      }
    }}/>
    <Route path="/jsonl" lazy={async () => {
      const { JsonlHome } = await import("./jsonl/JsonlHome")
      return {
        Component: JsonlHome
      }
    }}/>
    <Route path="/fine-tune" lazy={async () => {
      const { FinetuneHome } = await import("./fine-tune/FinetuneHome")
      return {
        Component: FinetuneHome
      }
    }}/>
    <Route path="/fine-tune/:id" lazy={async () => {
      const { FTOverviewHome, ftOverviewHomeLoader } = await import("./ft-overview/FTOverviewHome")
      return {
        loader: ftOverviewHomeLoader,
        Component: FTOverviewHome
      }
    }}/>
  </>)
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" lazy={async () => {
        const { HomeLayout } = await import("./home/HomeLayout")
        return { Component: HomeLayout }
      }}>
        { pagesRouter() }
      </Route>
    </>
  )
)
