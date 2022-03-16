import babydata from "./babynamesdata.json";
import { useState } from "react";
import sort from "./utils/sort";

const males = babydata
  .filter((x) => x.sex === "m")
  .sort((a, b) => sort(a.name, b.name));
const females = babydata
  .filter((x) => x.sex === "f")
  .sort((a, b) => sort(a.name, b.name));
const babies = babydata.sort((a, b) => sort(a.name, b.name));

interface Properties {
  id: number;
  name: string;
  sex: string;
}

function App(): JSX.Element {
  const [Names, setNames] = useState<Properties[]>(babies);
  const [Fav, setFav] = useState<Properties[]>([]);
  const [filterStorage, setfilterStorage] = useState<Properties[]>(babies);
  const [activeButton, setactiveButton] = useState("");

  const maleClick = () => {
    setNames(males);
    setfilterStorage(males);
    setactiveButton("malebutton");
  };
  const femaleClick = () => {
    setNames(females);
    setfilterStorage(females);
    setactiveButton("femalebutton");
  };
  const anyClick = () => {
    setNames(babies);
    setfilterStorage(babies);
    setactiveButton("anybutton");
  };

  // const addToFav = () => setFav()
  return (
    <>
      <input
        onChange={(e) =>
          setNames(
            filterStorage.filter(
              (x) =>
                x.name.toLowerCase().indexOf(e.target.value.toLowerCase()) === 0
            )
          )
        }
      />

      <button
        onClick={maleClick}
        className={activeButton === "malebutton" ? "activeButton" : ""}
      >
        M
      </button>
      <button
        onClick={femaleClick}
        className={activeButton === "femalebutton" ? "activeButton" : ""}
      >
        F
      </button>
      <button
        onClick={anyClick}
        className={activeButton === "anybutton" ? "activeButton" : ""}
      >
        ‍N
      </button>
      <h1>BABY NAMES DATABASE</h1>
      <hr />
      <h2>Your Favorite Baby Names</h2>
      {Fav.map((x) => (
        <li
          key={x.id}
          className={x.sex}
          onClick={() => {
            setFav(Fav.filter((y) => y !== x));
          }}
        >
          {x.name}
        </li>
      ))}
      <hr />
      <main className="Main">
        {Names.filter((x) => !Fav.includes(x)).map((x, id) => (
          <li
            key={x.id}
            className={x.sex}
            onClick={() => {
              setFav([...Fav, x]);
            }}
          >
            {x.name}
          </li>
        ))}
      </main>
    </>
  );
}

export default App;
