import { useEffect, useState } from "react";
import { getNames } from "./api";
import Item from "./components/NameItem";
import SearchField from "./components/NameItem/SearchField";
import RadioField from "./components/NameItem/RadioField";
import { TbArrowsRandom } from "react-icons/tb";
import { GiCardRandom } from "react-icons/gi";
import Modal from "react-modal";
import "./App.css";

const App = () => {

  const [namesData, setNamesData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [searchWord, setSearchWord] = useState('')
  const [favouriteData, setFavouriteData] = useState([]);
  const [gender, setGender] = useState('');
  const [chosenName, setChosenName] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getNames().then(data =>
      setNamesData(data),
    );
    localStorage.favouriteNames &&
      setFavouriteData(JSON.parse(localStorage.getItem("favouriteNames")));
    setSortedData(namesData)
  },[])

  useEffect(() => {
    const sortData = [...namesData].sort((a, b) => {
      return a.name > b.name ? 1 : -1
    })
    setSortedData(sortData);
  }, [namesData])

  const handleInput = event => {
    setSearchWord(event.target.value.toLowerCase());
  }

  const addFavouriteNames = (addId) => {
    let newFavoriteData = [...favouriteData, addId];
    setFavouriteData(newFavoriteData);
    localStorage.setItem("favouriteNames", JSON.stringify(newFavoriteData));
  };

  const removeFavouriteNames = (removeId) => {
    let newFavoriteData = favouriteData;
    newFavoriteData = favouriteData.filter(id => id !== removeId)
    setFavouriteData(newFavoriteData);
    localStorage.setItem("favouriteNames", JSON.stringify(newFavoriteData));
  };

  const handleChange = event => {
    setGender(event.target.value.toLowerCase());
  }

  const shuffle = () => {
    let newNames = sortedData;
    let currentIndex = newNames.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = newNames[currentIndex];
      newNames[currentIndex] = newNames[randomIndex];
      newNames[randomIndex] = temporaryValue;
    }
    setSortedData([...newNames]);
  }

  const openModal = () => {
    let chosenNum = Math.ceil(Math.random() * 2);
    let chosenNames = [];
    while (chosenNum) {
      let ranNum = Math.floor(Math.random() * namesData.length);
      chosenNames.push(namesData[ranNum]);
      chosenNum--;
    }
    setChosenName([...chosenNames])
    setIsOpen(true);
  }

  const closeModal = () => setIsOpen(false);
  return (
    <div className="container mx-auto mt-10 text-center border-2">
      <div className="flex items-center justify-center mt-10">
        <SearchField
          placeholder="Input searchword"
          value={searchWord}
          onChange={handleInput}
        />
        <div className="flex hiddenradio w-28" onChange={handleChange}>
          <RadioField
            width="60px"
            name="gender"
            value=""
            imgSrc="./images/all.png"
            checked='true' />
          <RadioField
            width="60px"
            name="gender"
            value="f"
            imgSrc="./images/female.png" />
          <RadioField
            width="60px"
            name="gender"
            value="m"
            imgSrc="./images/male.png" />
        </div>
        <button
          onClick={shuffle}>
          <TbArrowsRandom className="mx-1 text-3xl bg-gray-200 hover:text-red-500" />
        </button>
        <button
          className=""
          onClick={openModal}>
          <GiCardRandom className="mx-1 text-3xl bg-gray-200 hover:text-red-500" />
        </button>
        {/* <button onClick={openModal}>Open modal</button> */}
        <Modal onBlur={closeModal} isOpen={isOpen} ariaHideApp={false} onRequestClose={closeModal} className="w-48 mx-auto text-center mt-96 align-center">
          {
            chosenName.map((item, index) => {
              return (
                <Item
                  key={index}
                  id={index}
                  name={item.name}
                  gender={item.gender}
                />
              )
            })
          }
        </Modal>
      </div>
      <div className="flex flex-wrap justify-start pb-5 mx-10 border-b-2 w-100">
        <p className="text-5xl">Favourite:&nbsp;</p>
        {favouriteData.length
          ? (
            namesData
              .filter(item => favouriteData.includes(item.id))
              .map((item, index) => {
                return (

                  <Item
                    key={index}
                    id={index}
                    onClick={() => removeFavouriteNames(item.id)}
                    name={item.name}
                    gender={item.gender}
                  />
                )
              })
          )
          : (<p className="text-5xl text-gray-600">Click some names below to add your shortlist....</p>)}
      </div>
      <div className="flex flex-wrap justify-center w-100">
        {
          sortedData
            .filter(item => !favouriteData.includes(item.id))
            .filter(item => item.gender.toLowerCase().includes(gender))
            .filter(item => item.name.toLowerCase().includes(searchWord))
            .map((item, index) => {
              return (
                <Item
                  key={index}
                  id={index}
                  onClick={() => addFavouriteNames(item.id)}
                  name={item.name}
                  gender={item.gender}
                />
              )
            })
        }
      </div>
    </div>
  );
}

export default App;
