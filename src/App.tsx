import "./App.css";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { useAppDispatch } from "./app/hook";
import { fetchProfileThunk } from "./features/user/user.thunk";
function App() {
  const dispatch = useAppDispatch();
  const [appLoaded, setAppLoaded] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        await dispatch(fetchProfileThunk());
      } catch (err) {
        console.log("No logged-in user", err);
      } finally {
        setAppLoaded(true);
      }
    };

    initApp();
  }, [dispatch]);

  if (!appLoaded) {
    return; // or spinner
  }

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
