import { Outlet, useNavigate } from "react-router-dom";

const AppLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="container flex flex-col gap-4">
      <h1
        onClick={() => navigate("/")}
        className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl cursor-pointer"
      >
        Chad Flashcards
      </h1>
      <Outlet />
    </div>
  );
};

export default AppLayout;
