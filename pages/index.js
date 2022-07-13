import styles from "../styles/Home.module.scss";
import ParameterList from "../components/ParameterList";
import InstrumentList from "../components/InstrumentList";
import { useState, useEffect } from "react";
import instrumentData from "../components/data/instruments.json";
import simpleVocalData from "../components/data/simpleVocals.json";
import defaultVocalData from "../components/data/defaultVocals.json";
import defaultGuitarData from "../components/data/defaultGuitars.json";
import orchInstrumentData from "../components/data/orchInstruments.json";
import orchSectionData from "../components/data/orchSections.json";
import templateData from "../components/data/templates.json";
import Alerts from "../components/Alerts";
import InstrumentModal from "../components/Modals/InstrumentModal";
import ReplacementModal from "../components/Modals/ReplacementModal";
import TemplateModal from "../components/Modals/TemplateModal";
import { NextSeo } from "next-seo";
import { useCookies } from "react-cookie";
import { parseCookies } from "../helpers/index";
import download from "downloadjs";
import { round } from "lodash";

export default function Home({ data }) {
  //#region Variables
  const allInstruments = instrumentData;
  const basicVocalData = simpleVocalData;
  const defVocalData = defaultVocalData;
  const defGuitarData = defaultGuitarData;
  const orchInstData = orchInstrumentData;
  const orchSecData = orchSectionData;
  const templates = templateData;
  const [myInstruments, setMyInstruments] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [keyInc, setKeyInc] = useState(0);
  const [dupesChecked, setDupesChecked] = useState(false);
  const [showInstrumentModal, setShowInstrumentModal] = useState(false);
  const [showReplacementModal, setShowReplacementModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [replacementInstrumentID, setReplacementInstrumentID] = useState(0);
  const [cookie, setCookie] = useCookies(["userInstrumentList"]);
  const [vocalComplexityState, setVocalComplexityState] = useState("default");
  const [orchComplexityState, setOrchComplexityState] = useState("all");
  const [guitarComplexityState, setGuitarComplexityState] = useState("default");

  //#endregion

  //#region Instrument Generation Functions

  //getNewInstrument is a wrapper method for newInstrument that provides checking for duplicates and other parameters
  function getNewInstrument(newInstruments) {
    var newInst;

    if (dupesChecked) {
      //If no duplicates is checked, don't let it give a duplicate instrument

      var notDupe; //notDupe keeps track of if it's a duplicate or not

      do {
        newInst = newInstrument(); //pick a new instrument to try
        notDupe = true; //defaults to not being a duplicate

        //for each instrument in our list of instruments to be added, we compare the names against each other to try and find a duplicate
        newInstruments.map((instrument) => {
          if (newInst.name == instrument.name) {
            notDupe = false;
          }
        });

        //for each instrument in our list of existing instruments, we compare the names against each other to try and find a duplicate
        myInstruments.map((instrument) => {
          if (newInst.name == instrument.name) {
            notDupe = false;
          }
        });
      } while (notDupe == false);

      return newInst;
    } else {
      return newInstrument();
    }
  }

  //*** IMPORTANT NOTE ***: THIS FUNCTION SHOULD ONLY BE CALLED INSIDE OF "getNewInstrument" method, it's just a helper method to make code cleaner, do not call it outside of that
  const newInstrument = () => {
    var newInst;

    newInst =
      getAllInstrumentsCurrent()[
        Math.floor(Math.random() * getAllInstrumentsCurrent().length)
      ]; //pulls random object from allInstruments
    newInst = JSON.parse(JSON.stringify(newInst)); //deep clones the object
    newInst.locked = false; //defaults it to unlocked

    return newInst;
  };

  //i had to do this in kind of a scuffed way because of how setState works, because in React, setState will not execute each time in a loop
  const addNewInstruments = (insCount) => {
    if (insCount < 1) {
      pushAlert(
        closeAlert,
        "Invalid Input Warning",
        "Please input a number and ensure it's higher than 0",
        "warning",
        undefined,
        undefined,
        true
      );
    } else if (insCount > 1000) {
      pushAlert(
        closeAlert,
        "Invalid Input Warning",
        "1000 Instruments per input is the limit",
        "warning",
        undefined,
        undefined,
        true
      );
    } else if (dupesChecked && insCount > getUniqueInstrumentsRemaining()) {
      pushAlert(
        closeAlert,
        "Invalid Input Warning",
        "When 'No Duplicates' is checked, you cannot insert more instruments than are available. " +
          "[" +
          getUniqueInstrumentsRemaining() +
          " Unique Instruments Available]",
        "warning",
        undefined,
        undefined,
        true
      );
    } else {
      var tempInstruments = [...myInstruments];
      var newInstruments = [];
      for (var i = 0; i < insCount; i++) {
        var newInst = getNewInstrument(newInstruments);
        newInst.locked = false;
        newInstruments.push(newInst);
      }
      newInstruments.map((instrument) => {
        tempInstruments.push(instrument);
      });
      setMyInstruments(tempInstruments);
    }
  };

  const getUniqueInstrumentsRemaining = () => {
    var tempInstruments = myInstruments.filter(
      (v, i, a) => a.findIndex((t) => t.name === v.name) === i
    ); //creates a new array that gets rid of all duplicates in my instruments
    var numOfUniqueInstRemaining =
      getAllInstrumentsCurrent().length - tempInstruments.length;

    return numOfUniqueInstRemaining;
  };

  //#endregion

  //#region New List Generation

  const randomListOfInstruments = (min, max) => {
    if (myInstruments.length <= 0) {
      generateNewList(min, max);
    } else {
      pushAlert(
        closeAlert,
        "New List Warning",
        "Generating a new list will erase all unlocked instruments. Would you like to continue?",
        "danger",
        () => {
          generateNewList(min, max);
        },
        undefined,
        false
      );
    }
  };

  const generateNewList = (min, max) => {
    if (Number(min) > Number(max)) {
      pushAlert(
        closeAlert,
        "Numerical Warning",
        "The maximum must be greater than or equal to the minimum!",
        "warning",
        undefined,
        undefined,
        true
      );
    } else if (min === "" || max === "") {
      pushAlert(
        closeAlert,
        "Numerical Warning",
        "Please input both a minimum and maximum number!",
        "warning",
        undefined,
        undefined,
        true
      );
    } else {
      min = Math.ceil(min);
      max = Math.floor(max);
      var instrAmount = Math.floor(Math.random() * (max - min + 1) + min);
      var newInstruments = [];

      //check for locked instruments
      myInstruments.forEach((element) => {
        if (element.locked === true) {
          newInstruments.push(element);
        }
      });

      for (var i = 0; i < instrAmount; i++) {
        //Generate a new instrument for every instrumentRequested instrument
        newInstruments.push(getNewInstrument(newInstruments));
      }
      setMyInstruments(newInstruments);
    }
  };

  function tagBasedGeneration(num, category, family) {
    var newInstruments = [];

    getAllInstrumentsCurrent().forEach((instrument) => {
      if (dupesChecked) {
        //If no duplicates is checked, don't let it give a duplicate instrument
        var notDupe = true;

        myInstruments.map((existingInstrument) => {
          if (instrument.name == existingInstrument.name) {
            notDupe = false;
          }
        });

        if (notDupe) {
          if (category === "vocal") {
            if (
              instrument.tags.category === category &&
              instrument.tags.family === "vocal"
            ) {
              newInstruments.push(instrument);
            }
          } else {
            if (
              instrument.tags.category === category &&
              instrument.tags.family === family
            ) {
              newInstruments.push(instrument);
            }
          }
        }
      } else {
        if (category === "vocal") {
          if (
            instrument.tags.category === category &&
            instrument.tags.family === "vocal"
          ) {
            newInstruments.push(instrument);
          }
        } else {
          if (
            instrument.tags.category === category &&
            instrument.tags.family === family
          ) {
            newInstruments.push(instrument);
          }
        }
      }
    });

    if (newInstruments.length < 1) {
      pushAlert(
        closeAlert,
        "Invalid Input Warning",
        "When 'No Duplicates' is checked, you cannot insert more instruments than are available.",
        "warning",
        undefined,
        undefined,
        true
      );
    } else {
      var newMyInstruments = [...myInstruments];

      for (let index = 0; index < num; index++) {
        var newInstrument =
          newInstruments[Math.floor(Math.random() * newInstruments.length)];
        newInstrument.locked = false;
        newMyInstruments.push(newInstrument);
      }

      setMyInstruments(newMyInstruments);
    }
  }

  //#endregion

  //#region complex vocal gen

  function generateComplexVocalInstruments(amountOfInstruments) {
    //Generation Options
    var instrumentSize = ["Solo", "Small Group Of", "Large Group of"]; //maybe change gang to ensemble of
    var sex = ["Male", "Female", "Mixed Gender"];
    var maleRange = [
      "Countertenor",
      "Tenor",
      "Baritone",
      "Bass",
      "Falsetto",
      "Oktavist",
      "Boy",
    ];
    var femaleRange = ["Soprano", "Mezzo-Soprano", "Contralto", "Girl"];
    var articulations = [
      "Singing",
      "Opera Singing",
      "Screaming",
      "Chanting",
      "Humming",
      "Growling",
      "Shouting",
      "Pig Squealing",
      "Whistling",
      "Raspy Singing",
      "Throat Singing",
      "Beatboxing",
      "Rapping",
      "Scatting",
      "Toasting",
      "Yodeling",
    ];

    const groupChanceOfMultipleRanges = 0.3;

    var mySize = "";
    var mySex = "";
    var myRanges = [];
    var myArticulation = "";
    var myNameShort = [];

    //Generation and shit

    var results = [];

    for (let index = 0; index < amountOfInstruments; index++) {
      mySize = "";
      mySex = "";
      myRanges = [];
      myArticulation = "";

      //For cookie regeneration
      myNameShort = ["0"];

      //Size Gen
      var sizeNum = Math.round(Math.random() * 2);
      mySize = instrumentSize[sizeNum];
      myNameShort.push(sizeNum);

      //Sex Gen
      if (mySize == "Solo") {
        var sexNum = round(Math.random() * 1);
        mySex = sex[sexNum];
        myNameShort.push(sexNum);
      } else {
        var sexNum = round(Math.random() * 2);
        mySex = sex[sexNum];
        myNameShort.push(sexNum);
      }

      //Articulation Gen
      var articulationNum = Math.round(Math.random() * 15);
      myArticulation = articulations[articulationNum];
      myNameShort.push(articulationNum);

      //Range Gen
      if (mySize == "Solo") {
        //If it's a soloist
        if (mySex == "Male") {
          var rangeNum = Math.round(Math.random() * 6);
          myRanges.push(maleRange[rangeNum]);
          myNameShort.push(rangeNum);
        } else if (mySex == "Female") {
          var rangeNum = Math.round(Math.random() * 3);
          myRanges.push(femaleRange[rangeNum]);
          myNameShort.push(rangeNum);
        }
      } else {
        //If it's an ensemble of some kind
        if (Math.random() < groupChanceOfMultipleRanges) {
          //random chance for multiple ranges
          if (mySex == "Male") {
            //Gen Male group with multiple ranges
            var rangeNum1 = Math.round(Math.random() * 6);
            var firstRange = maleRange[rangeNum1];
            myRanges.push(firstRange);
            myNameShort.push(rangeNum1);
            var newRange = 0;
            var rangeNum2 = 0;
            do {
              rangeNum2 = Math.round(Math.random() * 6);
            } while (rangeNum1 == rangeNum2);
            newRange = maleRange[rangeNum2];
            myRanges.push(newRange);
            myNameShort.push(rangeNum2);
          } else if (mySex == "Female") {
            //female group
            var rangeNum1 = Math.round(Math.random() * 3);
            var firstRange = maleRange[rangeNum1];
            myRanges.push(firstRange);
            myNameShort.push(rangeNum1);
            var newRange = 0;
            var rangeNum2 = 0;
            do {
              rangeNum2 = Math.round(Math.random() * 3);
            } while (rangeNum1 == rangeNum2);
            newRange = maleRange[rangeNum2];
            myRanges.push(newRange);
            myNameShort.push(rangeNum2);
          } else {
            //mixed sex
            var rangeNum1 = Math.round(Math.random() * 6);
            var rangeNum2 = Math.round(Math.random() * 3);
            myRanges.push(maleRange[rangeNum1]);
            myRanges.push(femaleRange[rangeNum2]);
            myNameShort.push(rangeNum1);
            myNameShort.push(rangeNum2);
          }
        } else {
          //if we don't have multiple ranges, then just give it one of each, except for if it's a mixed choir, then it doesen't matter lol
          if (mySex == "Male") {
            var rangeNum = Math.round(Math.random() * 6);
            myRanges.push(maleRange[rangeNum]);
            myNameShort.push(rangeNum);
          } else if (mySex == "Female") {
            var rangeNum = Math.round(Math.random() * 3);
            myRanges.push(femaleRange[rangeNum]);
            myNameShort.push(rangeNum);
          } else {
            var rangeNum1 = Math.round(Math.random() * 6);
            var rangeNum2 = Math.round(Math.random() * 3);
            myRanges.push(maleRange[rangeNum1]);
            myRanges.push(femaleRange[rangeNum2]);
            myNameShort.push(rangeNum1);
            myNameShort.push(rangeNum2);
          }
        }
      }

      results.push({
        name: `${mySize} ${getRangesFormat(
          myRanges,
          mySize,
          false
        )} ${myArticulation}`,
        description: `A ${mySize.toLowerCase()} ${
          mySex == "Mixed Gender" ? "men and women" : mySex.toLowerCase()
        }${getVocalGenDescSuffix(
          mySize,
          mySex
        )} ${myArticulation.toLowerCase()} in the ${getRangesFormat(
          myRanges,
          mySize,
          true
        ).toLowerCase()} range${myRanges.length <= 1 ? "." : "s."}`,
        image: getVocalGenImage(mySex, myArticulation),
        youtube: getVocalGenYoutubeLink(mySex, myArticulation),
        wikipedia: getVocalGenWikipediaLink(mySex, myArticulation),
        tags: getVocalGenTags(mySex, myArticulation),
        generated: true,
        shortName: myNameShort,
        locked: false,
      });
    }

    return results;
  }

  function getVocalGenImage(sex, articulation) {
    var image;

    //try and fetch the image
    if (articulation == "Singing" || articulation == "Opera Singing") {
      //There are a couple special cases to check for
      if (sex == "Male") {
        image = defVocalData.filter((x) => x.name == "Male Singing")[0].image;
      } else {
        image = defVocalData.filter((x) => x.name == "Female Singing")[0].image;
      }
    } else {
      //If it's not a special case
      image = defVocalData.filter((x) => x.name == articulation)[0].image;
    }

    return image;
  }

  function getVocalGenYoutubeLink(sex, articulation) {
    var youtube;

    try {
      //try and fetch the image
      if (articulation == "Singing" || articulation == "Opera Singing") {
        //There are a couple special cases to check for
        if (sex == "Male") {
          youtube = defVocalData.filter((x) => x.name == "Male Singing")[0]
            .youtube;
        } else {
          youtube = defVocalData.filter((x) => x.name == "Female Singing")[0]
            .youtube;
        }
      } else {
        //If it's not a special case
        youtube = defVocalData.filter((x) => x.name == articulation)[0].youtube;
      }
    } catch (error) {
      console.log(error);
    }

    return youtube;
  }

  function getVocalGenWikipediaLink(sex, articulation) {
    var wikipedia;

    try {
      //try and fetch the image
      if (articulation == "Singing" || articulation == "Opera Singing") {
        //There are a couple special cases to check for
        if (sex == "Male") {
          wikipedia = defVocalData.filter((x) => x.name == "Male Singing")[0]
            .wikipedia;
        } else {
          wikipedia = defVocalData.filter((x) => x.name == "Female Singing")[0]
            .wikipedia;
        }
      } else {
        //If it's not a special case
        wikipedia = defVocalData.filter((x) => x.name == articulation)[0]
          .wikipedia;
      }
    } catch (error) {
      console.log(error);
    }

    return wikipedia;
  }

  function getVocalGenTags(sex, articulation) {
    var tags;

    try {
      //try and fetch the image
      if (articulation == "Singing" || articulation == "Opera Singing") {
        //There are a couple special cases to check for
        if (sex == "Male") {
          tags = defVocalData.filter((x) => x.name == "Male Singing")[0].tags;
        } else {
          tags = defVocalData.filter((x) => x.name == "Female Singing")[0].tags;
        }
      } else {
        //If it's not a special case
        tags = defVocalData.filter((x) => x.name == articulation)[0].tags;
      }
    } catch (error) {
      console.log(error);
    }

    return tags;
  }

  function getVocalGenDescSuffix(size, sex) {
    if (size == "Solo") {
      return "";
    } else {
      if (sex == "Mixed Gender") {
        return "";
      } else {
        return "s";
      }
    }
  }

  function getRangesFormat(ranges, size, noLetterSAtEnd) {
    var formattedReturn = "";

    ranges.map((range, i) => {
      if (size == "Solo") {
        //If theres only 1 range
        if (ranges.length <= 1) {
          formattedReturn += range;
        } else {
          formattedReturn += range + " and ";
        }
      } else {
        //If there's multiple
        if (i >= ranges.length - 1) {
          //if we're at the last item
          if (noLetterSAtEnd) {
            formattedReturn += range;
          } else {
            formattedReturn += range + "s";
          }
        } else {
          //if we aren't
          if (range == "Bass") {
            if (noLetterSAtEnd) {
              formattedReturn += range + " and ";
            } else {
              formattedReturn += range + "es and ";
            }
          } else {
            if (noLetterSAtEnd) {
              formattedReturn += range + " and ";
            } else {
              formattedReturn += range + "s and ";
            }
          }
        }
      }
    });

    return formattedReturn;
  }

  //#endregion

  //#region complex guitar gen

  function generateComplexGuitarInstruments(amountOfInstruments) {
    //Generation Options
    var distortionLevel = [
      "Clean",
      "Boosted",
      "Overdriven",
      "Distorted",
      "Fuzz",
      "Bitcrushed",
    ];
    var stringAmount = ["4", "6", "7", "8", "9"];
    var effects = [
      "Reverb",
      "Delay",
      "Tremolo",
      "Vibrato",
      "Chorus",
      "Flanger",
      "Phaser",
      "Whammy",
      "Wah",
      "Ring Mod",
      "Autofilter",
      "Volume Pedal",
      "Auto Wah",
      "Talk Box",
      "Harmonizer",
      "Feedbacker",
      "Auto Pan",
      "Echo",
      "Octaver",
      "Sustainer",
    ];

    var myDistortionLevel = "";
    var myStringAmount = "";
    var myEffects = [];
    var myNameShort = [];
    var amountOfEffects = 0;

    //Generation and shit

    var results = [];

    for (let index = 0; index < amountOfInstruments; index++) {
      //reset any values that may be applied
      myDistortionLevel = "";
      myStringAmount = "";
      myEffects = [];
      amountOfEffects = Math.round(Math.random() * 5) + 1;

      //For cookie regeneration
      myNameShort = ["1"];

      //Distortion Gen
      var distNum = Math.round(Math.random() * (distortionLevel.length - 1));
      myDistortionLevel = distortionLevel[distNum];
      myNameShort.push(distNum);

      //String Gen
      var weightNum = Math.random();

      if (weightNum <= 0.05) {
        myStringAmount = stringAmount[0];
        myNameShort.push(0);
      } else if (weightNum <= 0.1) {
        myStringAmount = stringAmount[4];
        myNameShort.push(4);
      } else if (weightNum <= 0.2) {
        myStringAmount = stringAmount[3];
        myNameShort.push(3);
      } else if (weightNum <= 0.35) {
        myStringAmount = stringAmount[2];
        myNameShort.push(2);
      } else if (weightNum <= 1) {
        myStringAmount = stringAmount[1];
        myNameShort.push(1);
      }

      //Effects Gen
      for (let index = 0; index < amountOfEffects; index++) {
        var effectsNum = null;
        do {
          effectsNum = Math.round(Math.random() * (effects.length - 1));
        } while (!guitarEffectsNoDupes(effects[effectsNum], myEffects));
        myEffects.push(effects[effectsNum]);
        myNameShort.push(effectsNum);
      }

      results.push({
        name: `${myStringAmount} String ${myDistortionLevel} Electric Guitar`,
        description: `Effects: ${myEffects.join(", ")}`,
        image: getGuitarGenImage(myDistortionLevel),
        youtube: "https://www.youtube.com/watch?v=Pg6QaQpSoUc",
        wikipedia: "https://en.wikipedia.org/wiki/Electric_guitar",
        tags: defGuitarData.filter((x) => x.name == "Clean Electric Guitar")[0]
          .tags,
        generated: true,
        shortName: myNameShort,
        locked: false,
      });
    }

    return results;
  }

  function guitarEffectsNoDupes(newEffect, effects) {
    var result = true;
    effects.map((effect) => {
      if (newEffect == effect) {
        result = false;
      }
    });
    return result;
  }

  function getGuitarGenImage(distortionLevel) {
    var image;

    switch (distortionLevel) {
      case "Clean":
        image = defGuitarData.filter(
          (x) => x.name == "Clean Electric Guitar"
        )[0].image;
        break;
      case "Boosted":
        image = defGuitarData.filter(
          (x) => x.name == "Overdriven Electric Guitar"
        )[0].image;
        break;
      case "Overdriven":
        image = defGuitarData.filter(
          (x) => x.name == "Overdriven Electric Guitar"
        )[0].image;
        break;
      case "Distorted":
        image = defGuitarData.filter(
          (x) => x.name == "Distorted Electric Guitar"
        )[0].image;
        break;
      case "Fuzz":
        image = defGuitarData.filter((x) => x.name == "Fuzz Electric Guitar")[0]
          .image;
        break;
      case "Bitcrushed":
        image = defGuitarData.filter((x) => x.name == "Fuzz Electric Guitar")[0]
          .image;
        break;
      default:
        Console.Log("ERROR 346: IMAGE NOT FOUND");
        break;
    }

    return image;
  }

  //#endregion

  //#region Instrument Deletion/Clearing

  function deleteInstrument(instrID) {
    if (myInstruments[instrID].locked) {
      //check if locked
      pushAlert(
        closeAlert,
        "Lock Warning",
        "This instrument is locked. Please unlock it to delete it.",
        "danger",
        undefined,
        undefined,
        true
      );
    } else {
      if (instrID > -1) {
        //checking for valid index
        myInstruments.splice(instrID, 1);
        setMyInstruments(
          myInstruments.filter((instrument) => instrument.index !== instrID)
        );
      } else {
        pushAlert(
          closeAlert,
          "Unspecified Error",
          "There was an error involving deleting an instrument. Error Code: DEL33",
          "danger",
          undefined,
          undefined,
          true
        );
      }
    }
  }

  function clearList() {
    if (myInstruments.length > 0 && allElementsLocked()) {
      //if there are elements present but they are all locked
      pushAlert(
        closeAlert,
        "Lock Warning",
        "All instruments in your list are locked! None of your list can be cleared until you unlock some instruments!",
        "danger",
        undefined,
        undefined,
        true
      );
    } else if (myInstruments.length > 0) {
      //if there are unlocked elements present
      var lockedInstr = [];
      myInstruments.forEach((element) => {
        if (element.locked == true) {
          //foreach element that is locked, save it
          lockedInstr.push(JSON.parse(JSON.stringify(element)));
        }
      });
      setMyInstruments(lockedInstr);
    } else {
      //if no elements are present
      //do nothing
    }
  }

  function checkClear() {
    if (myInstruments.length > 0) {
      pushAlert(
        closeAlert,
        "Clear List Warning",
        "Clearing your list will erase all unlocked instruments. Would you like to continue?",
        "warning",
        () => {
          clearList();
        },
        undefined,
        false
      );
    }
  }
  //#endregion

  //#region Instrument Shuffling
  function instrumentShuffle(instrID) {
    if (myInstruments[instrID].locked) {
      pushAlert(
        closeAlert,
        "Lock Warning",
        "This instrument is locked. Please unlock it to shuffle it.",
        "danger",
        undefined,
        undefined,
        true
      );
    } else {
      var tempInstruments = [...myInstruments];
      tempInstruments[instrID] = getNewInstrument([]);
      setMyInstruments(tempInstruments);
    }
  }
  //#endregion

  //#region Instrument Locking
  function allElementsLocked() {
    var isLocked = true;
    myInstruments.forEach((element) => {
      if (element.locked === false) {
        isLocked = false;
      }
    });
    return isLocked;
  }

  function toggleInstrumentLock(id) {
    //get the variables
    var newInstruments = [...myInstruments];
    var instrument = newInstruments[id];
    //do stuff to instrument
    instrument.locked = !instrument.locked;
    //reinsert the new instrument into the new array and replace the old array
    newInstruments[id] = instrument;
    setMyInstruments(newInstruments);
  }
  //#endregion

  //#region Alert Functions

  const pushAlert = (
    onClosing,
    alertHeading,
    alertText,
    alertVariant,
    methodToExecute,
    buttonText,
    buttonless
  ) => {
    setAlerts([
      ...alerts,
      {
        key: keyInc,
        onClosing: onClosing,
        alertHeading: alertHeading,
        alertText: alertText,
        alertVariant: alertVariant,
        methodToExecute: methodToExecute,
        buttonText: buttonText,
        buttonless: buttonless,
      },
    ]);

    setKeyInc(keyInc + 1);
  };

  const closeAlert = (id) => {
    setAlerts(alerts.filter((alert) => alert.key !== id));
  };

  //#endregion

  //#region Check Toggle Functions
  const toggleDupesChecked = () => {
    setDupesChecked(!dupesChecked);
  };

  //#endregion

  //#region Instrument Modal Functions
  const openInstrumentModal = () => {
    setShowInstrumentModal(true);
  };
  const closeInstrumentModal = () => {
    setShowInstrumentModal(false);
  };
  const addModalInstrument = (newInstrument) => {
    setMyInstruments([...myInstruments, newInstrument]);
  };
  //#endregion

  //#region Replacement Modal Functions
  const openReplacementModal = () => {
    setShowReplacementModal(true);
  };
  const closeReplacementModal = () => {
    setShowReplacementModal(false);
  };
  const replaceInstrument = (oldInstrumentID, newInstrument) => {
    oldInstrumentID = oldInstrumentID.ogInstId;
    var tempInstruments = [...myInstruments];
    if (tempInstruments[oldInstrumentID].locked) {
      pushAlert(
        closeAlert,
        "Lock Warning",
        "This instrument is locked. Please unlock it to replace it.",
        "danger",
        undefined,
        undefined,
        true
      );
    } else {
      tempInstruments[oldInstrumentID] = newInstrument;
      setMyInstruments(tempInstruments);
    }
  };
  //#endregion

  //#region Template Modal Functions

  const openTemplateModal = () => {
    setShowTemplateModal(true);
  };
  const closeTemplateModal = () => {
    setShowTemplateModal(false);
  };
  const addTemplate = (template) => {
    if (myInstruments.length > 0) {
      pushAlert(
        closeAlert,
        "Template Warning",
        "Generating a template will erase all instruments. Would you like to continue?",
        "warning",
        () => {
          templatePop(template);
        },
        undefined,
        false
      );
    } else {
      templatePop(template);
    }
  };

  const templatePop = (template) => {
    var newInstruments = [];

    template.map((templateI) => {
      allInstruments
        .concat(basicVocalData)
        .concat(defVocalData)
        .concat(orchInstData)
        .concat(orchSecData)
        .concat(defGuitarData)
        .map((masterI) => {
          if (templateI.name === masterI.name) {
            newInstruments.push(masterI);
          }
        });
    });

    newInstruments.map((instrument) => {
      instrument.locked = false;
    });

    setMyInstruments(newInstruments);
  };
  //#endregion

  //#region Export and Import

  function exportJSON(event) {
    if (myInstruments.length < 1) {
      pushAlert(
        closeAlert,
        "Empty List Error",
        "You cannot export an empty list!",
        "warning",
        undefined,
        undefined,
        true
      );
    } else {
      download(
        Buffer.from(JSON.stringify(myInstruments)).toString("base64"),
        "MyInstrumentationGenerationList.instrgen"
      );
    }
  }

  function importJSON(input) {
    var isValid = true;
    try {
      input = JSON.parse(Buffer.from(input, "base64").toString("utf-8"));
    } catch (error) {
      isValid = false;
      console.log(error);
    }

    if (input.length > 0 && input != myInstruments) {
      if (isValid === true) {
        for (let i = 0; i < input.length; i++) {
          //For each imported instrument
          const importedInstrument = input[i];
          var thisElementValid = false;
          if (importedInstrument.generated == true) {
            //skip database validation
          } else {
            for (let j = 0; j < getAllInstrumentsTotal().length; j++) {
              //For each instrument in our database
              const allInstrumentsInstrument = getAllInstrumentsTotal()[j];
              //If our data from our imported instrument matches atleast one instrument from the data
              var _ = require("lodash");
              if (
                _.isEqual(
                  _.omit(importedInstrument, ["locked", "id"]),
                  allInstrumentsInstrument
                )
              ) {
                thisElementValid = true;
              }
            }
            if (!thisElementValid) {
              isValid = false;
            }
          }
        }
      }

      if (isValid) {
        setMyInstruments([...input]);
      } else {
        pushAlert(
          closeAlert,
          "Damaged File Error",
          "Your file is unreadable, and cannot be imported. The file may have been altered or damaged!",
          "warning",
          undefined,
          undefined,
          true
        );
      }
    }
  }
  //#endregion

  //#region getInstruments
  function getAllInstrumentsCurrent() {
    var finalList = [];
    //check for vocal complexity
    switch (vocalComplexityState) {
      case "default":
        finalList = allInstruments.concat(defVocalData);
        break;
      case "basic":
        finalList = allInstruments.concat(basicVocalData);
        break;
      case "complex":
        var tempList = [...allInstruments];
        var genList = generateComplexVocalInstruments(30);
        tempList = tempList.concat(genList);
        finalList = tempList;
        break;
    }
    switch (orchComplexityState) {
      case "all":
        finalList = finalList.concat(orchInstData).concat(orchSecData);
        break;
      case "instruments":
        finalList = finalList.concat(orchInstData);
        break;
      case "sections":
        finalList = finalList.concat(orchSecData);
        break;
    }
    switch (guitarComplexityState) {
      case "default":
        finalList = finalList.concat(defGuitarData);
        break;
      case "complex":
        var tempList = [...finalList];
        var genList = generateComplexGuitarInstruments(10);
        tempList = tempList.concat(genList);
        finalList = tempList;
        break;
    }
    return finalList;
  }

  function getAllInstrumentsTotal() {
    return allInstruments
      .concat(basicVocalData)
      .concat(defVocalData)
      .concat(orchInstData)
      .concat(orchSecData)
      .concat(defGuitarData);
  }

  //#endregion

  //#region regeneration
  function regenerateVocals(instrumentName) {
    const instrumentSize = ["Solo", "Small Group Of", "Large Group of"]; //maybe change gang to ensemble of
    const sex = ["Male", "Female", "Mixed Gender"];
    const maleRange = [
      "Countertenor",
      "Tenor",
      "Baritone",
      "Bass",
      "Falsetto",
      "Oktavist",
      "Boy",
    ];
    const femaleRange = ["Soprano", "Mezzo-Soprano", "Contralto", "Girl"];
    const articulations = [
      "Singing",
      "Opera Singing",
      "Screaming",
      "Chanting",
      "Humming",
      "Growling",
      "Shouting",
      "Pig Squealing",
      "Whistling",
      "Raspy Singing",
      "Throat Singing",
      "Beatboxing",
      "Rapping",
      "Scatting",
      "Toasting",
      "Yodeling",
    ];

    var mySize = "";
    var mySex = "";
    var myRanges = [];
    var myArticulation = "";

    //For cookie regeneration
    var myNameShort = [0];

    var newInst = instrumentName;
    var params = newInst.split(".");

    for (let index = 1; index < params.length; index++) {
      //for each of our parameters
      const element = params[index];

      console.log("index ", index);
      console.log("element ", element);

      if (index == 1) {
        //if size
        var sizeNum = parseInt(element, 10);
        mySize = instrumentSize[sizeNum];
        myNameShort.push(sizeNum);
        console.log("size ", mySize);
      } else if (index == 2) {
        //if sex
        var sexNum = parseInt(element, 10);
        mySex = sex[sexNum];
        myNameShort.push(sexNum);
        console.log("mySex ", mySex);
      } else if (index == 3) {
        //if articulation
        var articulationNum = parseInt(element, 10);
        myArticulation = articulations[articulationNum];
        myNameShort.push(articulationNum);
        console.log(myArticulation);
      } else {
        //if range
        if (mySex == "Male") {
          var rangeNum = parseInt(element, 10);
          myRanges.push(maleRange[rangeNum]);
          myNameShort.push(rangeNum);
          console.log(myRanges);
        } else if (mySex == "Female") {
          var rangeNum = parseInt(element, 10);
          myRanges.push(femaleRange[rangeNum]);
          myNameShort.push(rangeNum);
          console.log(myRanges);
        } else {
          //Mixed Group
          if (myRanges.length > 0) {
            var rangeNum = parseInt(element, 10);
            myRanges.push(maleRange[rangeNum]);
            myNameShort.push(rangeNum);
            console.log(myRanges);
          } else {
            var rangeNum = parseInt(element, 10);
            myRanges.push(femaleRange[rangeNum]);
            myNameShort.push(rangeNum);
            console.log(myRanges);
          }
        }
        console.log(myRanges);
      }
    }

    return {
      name: `${mySize} ${getRangesFormat(
        myRanges,
        mySize,
        false
      )} ${myArticulation}`,
      description: `A ${mySize.toLowerCase()} ${
        mySex == "Mixed Gender" ? "men and women" : mySex.toLowerCase()
      }${getVocalGenDescSuffix(
        mySize,
        mySex
      )} ${myArticulation.toLowerCase()} in the ${getRangesFormat(
        myRanges,
        mySize,
        true
      ).toLowerCase()} range${myRanges.length <= 1 ? "." : "s."}`,
      image: getVocalGenImage(mySex, myArticulation),
      youtube: getVocalGenYoutubeLink(mySex, myArticulation),
      wikipedia: getVocalGenWikipediaLink(mySex, myArticulation),
      tags: getVocalGenTags(mySex, myArticulation),
      generated: true,
      shortName: myNameShort,
      locked: false,
    };
  }

  function regenerateGuitar(instrumentName) {
    var distortionLevel = [
      "Clean",
      "Boosted",
      "Overdriven",
      "Distorted",
      "Fuzz",
      "Bitcrushed",
    ];
    var stringAmount = ["4", "6", "7", "8", "9"];
    var effects = [
      "Reverb",
      "Delay",
      "Tremolo",
      "Vibrato",
      "Chorus",
      "Flanger",
      "Phaser",
      "Whammy",
      "Wah",
      "Ring Mod",
      "Autofilter",
      "Volume Pedal",
      "Auto Wah",
      "Talk Box",
      "Harmonizer",
      "Feedbacker",
      "Auto Pan",
      "Echo",
      "Octaver",
      "Sustainer",
    ];

    var myDistortionLevel = "";
    var myStringAmount = "";
    var myEffects = [];

    //For cookie regeneration
    var myNameShort = [1];

    var newInst = instrumentName;
    var params = newInst.split(".");

    console.log(params);

    for (let index = 1; index < params.length; index++) {
      //for each of our parameters
      const element = params[index];

      console.log("index ", index);
      console.log("element ", element);

      if (index == 1) {
        //if distortion
        var distortionNum = parseInt(element, 10);
        myDistortionLevel = distortionLevel[distortionNum];
        myNameShort.push(distortionNum);
        console.log("distortion ", distortionNum);
      } else if (index == 2) {
        //if strings
        var stringNum = parseInt(element, 10);
        myStringAmount = stringAmount[stringNum];
        myNameShort.push(stringNum);
        console.log("myStringAmount ", myStringAmount);
      } else {
        //if effect
        var effectNum = parseInt(element, 10);
        myEffects.push(effects[effectNum]);
        myNameShort.push(effectNum);
        console.log("effect ", effects[effectNum]);
      }
    }

    return {
      name: `${myStringAmount} String ${myDistortionLevel} Electric Guitar`,
      description: `Effects: ${myEffects.join(", ")}`,
      image: getGuitarGenImage(myDistortionLevel),
      youtube: "https://www.youtube.com/watch?v=Pg6QaQpSoUc",
      wikipedia: "https://en.wikipedia.org/wiki/Electric_guitar",
      tags: defGuitarData.filter((x) => x.name == "Clean Electric Guitar")[0]
        .tags,
      generated: true,
      shortName: myNameShort,
      locked: false,
    };
  }
  //#endregion

  //#region cookie stuff

  function isNumeric(str) {
    if (typeof str != "string") return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  //on load, if a cookie is present, use those instruments to pre populate the instrument list
  useEffect(() => {
    try {
      var savedInstrumentData = data.userInstrumentList.split(",");
      var newInstruments = [];

      console.log(savedInstrumentData);

      savedInstrumentData.map((instrumentName) => {
        if (isNumeric(instrumentName[0])) {
          //if generated
          if (instrumentName[0] == "0") {
            // '0' means it's vocal
            newInstruments.push(regenerateVocals(instrumentName));
          } else if (instrumentName[0] == "1") {
            // '1' means it's a guitar
            newInstruments.push(regenerateGuitar(instrumentName));
          }
        } else {
          getAllInstrumentsTotal().map((inst2) => {
            if (instrumentName == inst2.name) {
              var newInstr = inst2;
              inst2.locked = false;

              newInstruments.push(newInstr);
            }
          });
        }
      });

      setMyInstruments(newInstruments);
    } catch (err) {
      console.log(err);
    }
  }, []);

  //anytime myInstruments is changed, we set the cookie properly
  useEffect(() => {
    var instrList = [];

    //If it's generated, then convert it's shortname into a string
    myInstruments.map((instrument) => {
      if (instrument.generated == true) {
        var newInst = instrument;
        console.log(newInst.shortName);
        if (typeof newInst.shortName == "string") {
          //don't do anything
        } else {
          newInst.shortName = newInst.shortName.join(".");
        }
        instrList.push(newInst.shortName);
      } else {
        instrList.push(instrument.name);
      }
    });

    try {
      setCookie("userInstrumentList", instrList.join(), {
        path: "/",
        maxAge: 36000,
        sameSite: true,
      });
      console.log(instrList);
    } catch (err) {
      console.log(err);
    }
  }, [myInstruments]);

  //#endregion

  return (
    <div>
      <NextSeo
        description="A tool for composers to randomly generate groups of instruments to help jumpstart creativity, as well as learn about new instruments."
        openGraph={{
          images: [
            {
              url: "/images/header.jpg",
              width: 800,
              height: 600,
              alt: "Robby's instrumentation generation",
            },
          ],
          site_name: "Instrumentation Generation",
        }}
      />
      {showInstrumentModal ? (
        <InstrumentModal
          onClose={closeInstrumentModal}
          instruments={getAllInstrumentsCurrent()}
          onConfirm={addModalInstrument}
        />
      ) : (
        ""
      )}
      {showReplacementModal ? (
        <ReplacementModal
          onClose={closeReplacementModal}
          instruments={getAllInstrumentsCurrent()}
          onConfirm={replaceInstrument}
          ogInstId={replacementInstrumentID}
        />
      ) : (
        ""
      )}
      {showTemplateModal ? (
        <TemplateModal
          onClose={closeTemplateModal}
          templates={templates}
          onConfirm={addTemplate}
          allInstruments={getAllInstrumentsTotal()}
        />
      ) : (
        ""
      )}
      {alerts.length > 0 ? (
        <Alerts alerts={alerts} onClosing={closeAlert} />
      ) : (
        ""
      )}
      <h1 className={styles.headingOne}>Parameters</h1>
      <ParameterList
        onRandomList={randomListOfInstruments}
        onNewList={addNewInstruments}
        onClear={checkClear}
        onDupesCheck={toggleDupesChecked}
        onInstrumentModal={openInstrumentModal}
        onTemplateModal={openTemplateModal}
        pushAlert={pushAlert}
        onTagGen={tagBasedGeneration}
        onExport={exportJSON}
        onImport={importJSON}
        onVocalComplexChange={setVocalComplexityState}
        vocalComplexityState={vocalComplexityState}
        onOrchComplexChange={setOrchComplexityState}
        orchComplexityState={orchComplexityState}
        onGuitarComplexChange={setGuitarComplexityState}
        guitarComplexityState={guitarComplexityState}
      ></ParameterList>
      <h1 className={styles.headingOne}>Instrument List</h1>
      <InstrumentList
        instruments={myInstruments}
        onDel={deleteInstrument}
        onLoc={toggleInstrumentLock}
        onShuf={instrumentShuffle}
        onRepButClick={openReplacementModal}
        setRepInstrumentID={setReplacementInstrumentID}
      ></InstrumentList>
    </div>
  );
}

Home.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  return {
    data: data && data,
  };
};
