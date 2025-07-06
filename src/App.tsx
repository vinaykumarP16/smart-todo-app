// src/App.tsx
import React, { useEffect } from "react";
import useThemeStore from "./store/themeStore";
import Header from "./components/Header";
import TaskList from "./components/TaskCard/TaskList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { theme } = useThemeStore();

  // Apply or remove 'dark' class to the <html> element
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Header />
        <div className="pt-20 px-4">
          <TaskList />
        </div>
      </QueryClientProvider>
      <ToastContainer position="bottom-center" autoClose={4000} />
    </div>
  );
};

export default App;
