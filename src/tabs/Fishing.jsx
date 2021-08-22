import React, { useState } from "react";

import "../App.css";
// import { styled } from "@material-ui/core/styles";
// import Slider from "./components/Slider";
import Attribute from "../components/Attribute";
import Display from "../components/Display";
// import Dropdown from "./components/Dropdown";
import ToggleButtons from "../components/ToggleButtons";
import Boosts from "../components/Boosts";
import Footer from "../components/Footer";
import CustomSwitch from "../components/CustomSwitch";


const Mining = () => {
  // Person's current level
  const [currentLevel, setCurrentLevel] = useState(1);
  const updateCurrentLevel = (currentLevel) => {
    setCurrentLevel(currentLevel);
  };
  // Person's target level
  const [targetLevel, setNextAttribute] = useState(1);
  const updateTargetLevel = (targetLevel) => {
    setNextAttribute(targetLevel);
  };
  // Person's target material
  const [material, setMaterial] = useState([
    "material",
    { name: "material", submaterials: {} },
  ]);
  const updateMaterial = (material) => {
    setMaterial(material);
  };

  // Person's target material
  const [gatheringData, setGatheringData] = useState({});

  // Exp boosts
  const [boostsDidUpdate, setBoostDidUpdate] = useState(["Boost name", false]);
  const [boosts, setBoosts] = useState([
    { name: "World Boost", value: 1.5, active: false },
  ]);
  const updateBoosts = (boosts, updatedBoostName) => {
    setBoosts(boosts);
    setBoostDidUpdate([updatedBoostName, !boostsDidUpdate[1]]);
    // console.log("Boosts update", updatedBoostName);
  };

//   Select fished or baits
  const [selectFishOrBait, setSelectFishOrBait] = useState(false);
  const updateselectFishOrBait = (selectFishOrBait) => {
    // console.log(selectFishOrBait);
    setSelectFishOrBait(selectFishOrBait);
  };

  React.useEffect(() => {
    // fetch("http://localhost:8000/gathering")
    fetch("https://coa-calculator-backend.herokuapp.com/gathering")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => {
        // setBusy(false);
        setGatheringData(data);
        // console.log("set busy");
      })
      .catch((error) => {
        // console.log("Error:", error);
      });
  }, []);

  return (
    <>
      <Attribute
        
        maxValue={120}
        attributeName={"Your Fishing Level"}
        updateAttribute={updateCurrentLevel}
      />
      <Attribute
        
        maxValue={120}
        attributeName={"Target Fishing Level"}
        updateAttribute={updateTargetLevel}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      />
      {selectFishOrBait === true ? (
        // Render bait buttons
        <ToggleButtons
          updateMaterial={updateMaterial}
          skillsData={gatheringData}
          skill="Fishing-Baits"
        />
      ) : (
        // Render fish buttons
        <ToggleButtons
          updateMaterial={updateMaterial}
          skillsData={gatheringData}
          skill="Fishing"
        />
      )}
      <CustomSwitch
        value={selectFishOrBait}
        updateValue={updateselectFishOrBait}
        falseText="Fish"
        trueText="Bait"
      />
      <Boosts boosts={boosts} updateBoosts={updateBoosts} />

      <Display
        level={currentLevel}
        targetLevel={targetLevel}
        material={material}
        keywords={[""]}
        boosts={boosts}
        boostsDidUpdate={boostsDidUpdate}
      />
      {/* <Slider sliderName={"Your Smithing XP"}/>
      <Slider sliderName={"Ore 1"}/>
      <Slider sliderName={"Ore 2"}/> */}
      <Footer />
    </>
  );
};

export default Mining;