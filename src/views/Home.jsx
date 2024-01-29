import Recent from "../components/Recent";
import SearchBar from "../components/SearchBar";

const Home = () => {
  return (
    <>
      <div className="home">
        <SearchBar />
        <Recent />
      </div>
    </>
  );
};

export default Home;
