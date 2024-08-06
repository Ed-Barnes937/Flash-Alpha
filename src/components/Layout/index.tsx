import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="container flex flex-col gap-4">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Chad Flashcards
      </h1>
      <Outlet />
    </div>
  );
};

export default AppLayout;
