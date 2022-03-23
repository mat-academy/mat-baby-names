import React, { useState } from 'react';
import allBabyNames from './data/babynamesdata.json';
import './css/style.css';

interface BabyNameInfo {
  name: string;
  id: number;
  sex: string;
}

function compareTwoBabyNameInfos(infoA:BabyNameInfo , infoB:BabyNameInfo ) {
  if(infoA.name < infoB.name){
    return -1;
  } else if(infoA.name > infoB.name){
    return 1;
  } else {
    return 0;
  }
}

function App(): JSX.Element {
  const sortedBabyNames:BabyNameInfo[] = [...allBabyNames];
    sortedBabyNames.sort(compareTwoBabyNameInfos);
  const [searchTerm, setSearchTerm] = useState("");

  const [favouriteNames, setFavouriteNames] = useState<BabyNameInfo[]>([]);
  const namesToShow: BabyNameInfo[] = sortedBabyNames.filter(doesSearchTermOccurInName);

  function handleSearchTermUpdated(event: any) {
      setSearchTerm(event.target.value);
  }  

  function doesSearchTermOccurInName(nameInfo: BabyNameInfo): boolean {
    return nameInfo.name.toLowerCase().includes(searchTerm.toLowerCase());
  }

  function isInFavouriteNamesList(target: BabyNameInfo) {
    return favouriteNames.find(el => el.id === target.id) !== undefined;
  }

  function handleNameClick(nameInfo: BabyNameInfo) {
    if (isInFavouriteNamesList(nameInfo)) {
      console.log("Name is already in list", nameInfo.name)
    } else {
      const newFavouriteNames = [...favouriteNames, nameInfo];
      setFavouriteNames(newFavouriteNames);
    }
  }

  function handleClickOfNameInFavourites(nameInfoToRemove: BabyNameInfo) {
    const newList = favouriteNames.filter(el => el.id !== nameInfoToRemove.id);
    setFavouriteNames(newList);
  }

  return (
    <div className="App">
      <h1>Mat's Baby Names</h1>
      <hr />
      <input 
        placeholder = "Looking for a name?"
        value = {searchTerm}
        onChange = {handleSearchTermUpdated}
      />
      <br />
      currently searching for {searchTerm}
      <hr />
      <h2>Favorite names</h2>

      ({favouriteNames.length}) so far: {favouriteNames.map(el => el.name).join(", ")}

      <div className="babyNamesList">
        {favouriteNames.map(nameInfo => (
          <div
            className={"babyName " + nameInfo.sex}
            key={nameInfo.id}
            onClick={() => handleClickOfNameInFavourites(nameInfo)}
          >{nameInfo.name}</div>
        ))}
      </div>
      <hr />
      ({namesToShow.length}) names left in the list:
      <div className="babyNamesList">
        {sortedBabyNames.map(nameInfo => (
          <main
            className={"babyName " + nameInfo.sex}
            key={nameInfo.id}
            onClick={() => handleNameClick(nameInfo)}
          >{nameInfo.name}</main>
        )
        )}
      </div>
      <hr />
    </div>
  );
}

export default App;
