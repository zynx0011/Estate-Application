import "./App.css";
import { useSelector } from "react-redux";

function App() {
  const { currentUser } = useSelector((state) => state.auth);
  const user = currentUser?.data?.data?.user;

  return (
    <>
      <h1 className="text-3xl font-bold underline text-center">
        {user?.username} <br /> Welcome to the Netflix
      </h1>
    </>
  );
}

export default App;
