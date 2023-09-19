import "./bootstrap";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Home from "./components/Home";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("app")).render(
    <QueryClientProvider client={queryClient}>
        <Home />
        <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
);
