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
