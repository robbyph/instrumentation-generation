import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'
import ParameterList from '../components/ParameterList'
import InstrumentList from '../components/InstrumentList'
import { useState, useEffect } from 'react'
import instrumentData from '../components/data/instruments.json'
import simpleVocalData from '../components/data/simpleVocals.json'
import defaultVocalData from '../components/data/defaultVocals.json'
import complexGenerationData from '../components/data/complexGenData.json'
import templateData from '../components/data/templates.json'
import Alerts from '../components/Alerts'
import InstrumentModal from '../components/Modals/InstrumentModal'
import ReplacementModal from '../components/Modals/ReplacementModal'
import TemplateModal from '../components/Modals/TemplateModal'
import { NextSeo, SoftwareAppJsonLd } from 'next-seo'
import { useCookies } from "react-cookie"
import { parseCookies } from "../helpers/index"
import download from 'downloadjs'
import NewsletterSubscribe from '../components/NewsletterSubscribe'
import { round } from 'lodash'

export default function Home({data}) {
    
    //#region Variables
    const allInstruments = instrumentData
    const basicVocalData = simpleVocalData
    const defVocalData = defaultVocalData
    const complexGenData = complexGenerationData
    const templates = templateData
    const [myInstruments, setMyInstruments] = useState([])
    const [alerts, setAlerts] = useState([])
    const [keyInc, setKeyInc] = useState(0)
    const [dupesChecked, setDupesChecked] = useState(false)
    const [showInstrumentModal, setShowInstrumentModal] = useState(false)
    const [showReplacementModal, setShowReplacementModal] = useState(false)
    const [showTemplateModal, setShowTemplateModal] = useState(false)
    const [replacementInstrumentID, setReplacementInstrumentID] = useState(0)
    const [cookie, setCookie] = useCookies(["userInstrumentList"])
    const [vocalComplexityState, setVocalComplexityState] = useState('default')

    //#endregion

    //#region Instrument Generation Functions

    //getNewInstrument is a wrapper method for newInstrument that provides checking for duplicates and other parameters
    function getNewInstrument(newInstruments) {
        var newInst;

        if(dupesChecked){ //If no duplicates is checked, don't let it give a duplicate instrument
            
            
            var notDupe;  //notDupe keeps track of if it's a duplicate or not

            do {
                newInst = newInstrument(); //pick a new instrument to try
                notDupe = true; //defaults to not being a duplicate

                //for each instrument in our list of instruments to be added, we compare the names against each other to try and find a duplicate
                newInstruments.map(instrument => {
                    if (newInst.name == instrument.name) {
                        notDupe = false;
                    }
                });

                //for each instrument in our list of existing instruments, we compare the names against each other to try and find a duplicate
                myInstruments.map(instrument => {
                    if (newInst.name == instrument.name) {
                        notDupe = false;
                    }
                });
    
            } while (notDupe == false);
    
            return newInst;
        }else{
            return newInstrument();
        }
    }

    //*** IMPORTANT NOTE ***: THIS FUNCTION SHOULD ONLY BE CALLED INSIDE OF "getNewInstrument" method, it's just a helper method to make code cleaner, do not call it outside of that 
    const newInstrument = () => {
        var newInst;

        newInst = getAllInstruments()[Math.floor(Math.random() * getAllInstruments().length)]; //pulls random object from allInstruments
        newInst = JSON.parse(JSON.stringify(newInst)); //deep clones the object
        newInst.locked = false; //defaults it to unlocked
    
        return newInst;
    }

    //i had to do this in kind of a scuffed way because of how setState works, because in React, setState will not execute each time in a loop
    const addNewInstruments = (insCount) => {    
        if(insCount < 1){
            pushAlert(closeAlert, "Invalid Input Warning", "Please input a number and ensure it's higher than 0", "warning", undefined, undefined, true)
        }else if(insCount > 1000){
            pushAlert(closeAlert, "Invalid Input Warning", "1000 Instruments per input is the limit", "warning", undefined, undefined, true)
        }else if(dupesChecked && insCount > getUniqueInstrumentsRemaining()){
            pushAlert(closeAlert, "Invalid Input Warning", "When 'No Duplicates' is checked, you cannot insert more instruments than are available. " + '[' + getUniqueInstrumentsRemaining() + ' Unique Instruments Available]', "warning", undefined, undefined, true)
        }
        else{
            var tempInstruments = ([...myInstruments]);
            var newInstruments = []
            for (var i = 0; i < insCount; i++) {
                var newInst = getNewInstrument(newInstruments)
                newInst.locked = false
                newInstruments.push(newInst)
            }
            newInstruments.map((instrument)=> {
                tempInstruments.push(instrument)
            })
            setMyInstruments(tempInstruments)
        }

    }

    const getUniqueInstrumentsRemaining = () => {
        var tempInstruments = myInstruments.filter((v,i,a)=>a.findIndex(t=>(t.name===v.name))===i) //creates a new array that gets rid of all duplicates in my instruments 
        var numOfUniqueInstRemaining = getAllInstruments().length - tempInstruments.length;
        

        return numOfUniqueInstRemaining;
    }

    //#endregion

    //#region New List Generation

    const randomListOfInstruments = (min, max) => {
        if (myInstruments.length <= 0) {
            generateNewList(min, max);
        }else {
            pushAlert(closeAlert, "New List Warning", "Generating a new list will erase all unlocked instruments. Would you like to continue?", "danger", () => {generateNewList(min, max)}, undefined, false)
        }  
    }

    const generateNewList = (min, max) => {
        if(Number(min) > Number(max)){
            pushAlert(closeAlert, "Numerical Warning", "The maximum must be greater than or equal to the minimum!", "warning", undefined, undefined, true)
        }else if (min === "" || max === "") {
            pushAlert(closeAlert, "Numerical Warning", "Please input both a minimum and maximum number!", "warning", undefined, undefined, true)
        }else {
            min = Math.ceil(min)
            max = Math.floor(max)
            var instrAmount = Math.floor(Math.random() * (max - min + 1) + min);
            var newInstruments = []
            
            //check for locked instruments
            myInstruments.forEach(element => {
                if (element.locked === true) {
                    newInstruments.push(element);
                }
            });

            for (var i = 0; i < instrAmount; i++) { //Generate a new instrument for every instrumentRequested instrument
                newInstruments.push(getNewInstrument(newInstruments));
            }
            setMyInstruments(newInstruments)
        }
    }

    function tagBasedGeneration (num, category, family) {
        var newInstruments = []

        getAllInstruments().forEach(instrument => {
            if(dupesChecked){ //If no duplicates is checked, don't let it give a duplicate instrument
                var notDupe = true;
                
                myInstruments.map(existingInstrument => {
                    if (instrument.name == existingInstrument.name) {
                        notDupe = false;
                    }
                });
        
                if (notDupe) {
                    if (category === 'vocal') {
                        if (instrument.tags.category === category && instrument.tags.family === 'vocal') {
                            newInstruments.push(instrument)
                        }                
                    }else{
                        if (instrument.tags.category === category && instrument.tags.family === family) {
                            newInstruments.push(instrument)
                        }
                    }
                }
                
            }else{
                if (category === 'vocal') {
                    if (instrument.tags.category === category && instrument.tags.family === 'vocal') {
                        newInstruments.push(instrument)
                    }                
                }else{
                    if (instrument.tags.category === category && instrument.tags.family === family) {
                        newInstruments.push(instrument)
                    }
                }
            }
            
        });

        if (newInstruments.length < 1) {
            pushAlert(closeAlert, "Invalid Input Warning", "When 'No Duplicates' is checked, you cannot insert more instruments than are available.", "warning", undefined, undefined, true)
        }else{
            var newMyInstruments = [...myInstruments]
        
            for (let index = 0; index < num; index++) {
                var newInstrument = newInstruments[Math.floor(Math.random()*newInstruments.length)];
                newInstrument.locked = false;
                newMyInstruments.push(newInstrument);              
            }

            setMyInstruments(newMyInstruments)
        }
    }

    function generateComplexVocalInstruments(){
        //Generation Options
        var instrumentSize = ['Solo', 'Small Group Of', 'Large Group of'] //maybe change gang to ensemble of
        var sex = ['Male', 'Female', 'Mixed Gender']
        var maleRange = ['Countertenor', 'Tenor', 'Baritone', 'Bass', 'Falsetto', 'Oktavist', 'Boy']
        var femaleRange = ['Soprano', 'Mezzo-Soprano', 'Contralto', 'Girl']
        var articulations = ['Singing', 'Opera Singing', 'Screaming', 'Chanting', 'Humming', 'Growling', 'Shouting', 'Pig Squealling', 'Raspy Singing', 'Throat Singing', 'Beatboxing', 'Rapping', 'Scatting', 'Toasting', 'Doing Vocal Percussion', 'Yodeling']

        const groupChanceOfMultipleRanges = .99


        var mySize = ''
        var mySex = ''
        var myRanges = []
        var myArticulation = ''

        //Generation and shit

        var results = []

        for (let index = 0; index < 40; index++) {


            mySize = ''
            mySex = ''
            myRanges = []
            myArticulation = ''


            //Size Gen
            mySize = instrumentSize[Math.round(Math.random() * 2)]
           
            //Sex Gen
            if (mySize == 'Solo'){
                mySex = sex[round(Math.random() * 1)]
            }else{
                mySex = sex[round(Math.random() * 2)]
            }
            
            //Range Gen
            if (mySize == 'Solo'){ //If it's a soloist
                if (mySex == 'Male') {
                    myRanges.push(maleRange[Math.round(Math.random() * 6)])
                }else if (mySex == 'Female') {
                    myRanges.push(femaleRange[Math.round(Math.random() * 3)])
            }}else { //If it's an ensemble of some kind
                if (Math.random() < groupChanceOfMultipleRanges) {//random chance for multiple ranges
                    if (mySex == 'Male') {
                        var firstRange = maleRange[Math.round(Math.random() * 6)]
                        myRanges.push(firstRange)
                        var newRange = 0
                        do{
                            newRange = maleRange[Math.round(Math.random() * 6)]
                        }while(newRange == firstRange)
                        myRanges.push(newRange)
                    }else if (mySex == 'Female') {
                        var firstRange = femaleRange[Math.round(Math.random() * 3)]
                        myRanges.push(firstRange)
                        var newRange = 0
                        do{
                            newRange = femaleRange[Math.round(Math.random() * 3)]
                        }while(newRange == firstRange)
                        myRanges.push(newRange)
                    }else{
                        myRanges.push(maleRange[Math.round(Math.random() * 6)])
                        myRanges.push(femaleRange[Math.round(Math.random() * 3)])
                    }
                }else{//if we don't have multiple ranges, then just give it one of each, except for if it's a mixed choir, then it doesen't matter lol
                    if (mySex == 'Male') {
                        myRanges.push(maleRange[Math.round(Math.random() * 6)])
                    }else if (mySex == 'Female') {
                        myRanges.push(femaleRange[Math.round(Math.random() * 3)])
                    }else{
                        myRanges.push(maleRange[Math.round(Math.random() * 6)])
                        myRanges.push(femaleRange[Math.round(Math.random() * 3)])
                    }
                }
                
            }

            //Articulation Gen
            myArticulation = articulations[Math.round(Math.random() * 15)]

            results.push({
                name: `${mySize} ${getRangesFormat(myRanges, mySize, false)} ${myArticulation}`,
                description:`A ${mySize.toLowerCase()} ${mySex == 'Mixed Gender'?'men and women':mySex.toLowerCase()}${getVocalGenDescSuffix(mySize, mySex)} ${myArticulation.toLowerCase()} in the ${getRangesFormat(myRanges, mySize, true).toLowerCase()} range${myRanges.length <= 1 ?'.':'s.'}`
                //, image: complexGenData.filter(x => x.name == `${mySize} ${myArticulation}`)[0].image
            })
        }

        

        return results
    }

    function getVocalGenDescSuffix(size, sex){
        if (size == 'Solo') {
            return ''
        }else{
            if (sex == 'Mixed Gender') {
                return ''
            }else{
                return 's'
            }
        }
    }

    function getRangesFormat(ranges, size, noLetterSAtEnd){
        var formattedReturn = ''

        ranges.map((range, i)=>{
            if (size == 'Solo') {//If theres only 1 range
                if(ranges.length <= 1){
                    formattedReturn += range
                }else{
                    formattedReturn += (range + ' and ')
                }
                
            }else{//If there's multiple
                if (i >= ranges.length - 1) { //if we're at the last item
                    if (noLetterSAtEnd){
                        formattedReturn += (range)
                    }else{
                        formattedReturn += (range + 's')
                    }
                }else{ //if we aren't
                    if (range == 'Bass') {
                        if (noLetterSAtEnd){
                            formattedReturn += (range + ' and ')
                        }else{
                            formattedReturn += (range + 'es and ')
                        }
                    }else{
                        if (noLetterSAtEnd){
                            formattedReturn += (range + ' and ')
                        }else{
                            formattedReturn += (range + 's and ')
                        }
                        
                    }
                }
            }
            })

        return formattedReturn
    }

    //#endregion
    
    //#region Instrument Deletion/Clearing

    function deleteInstrument(instrID) {
        if(myInstruments[instrID].locked){ //check if locked
            pushAlert(closeAlert, "Lock Warning", "This instrument is locked. Please unlock it to delete it.", "danger", undefined, undefined, true)
        } else{
            if(instrID > -1){ //checking for valid index
                myInstruments.splice(instrID, 1)
                setMyInstruments(myInstruments.filter((instrument) => instrument.index !== instrID))
            } else{
                pushAlert(closeAlert, "Unspecified Error", "There was an error involving deleting an instrument. Error Code: DEL33", "danger", undefined, undefined, true )            
            }
        }
        
    }

    function clearList(){
        
        if (myInstruments.length > 0 && allElementsLocked()) { //if there are elements present but they are all locked
            pushAlert(closeAlert, "Lock Warning", "All instruments in your list are locked! None of your list can be cleared until you unlock some instruments!", "danger", undefined, undefined, true )
        } 
        else if (myInstruments.length > 0) { //if there are unlocked elements present
            var lockedInstr = [];
            myInstruments.forEach(element => {
                if (element.locked == true) { //foreach element that is locked, save it 
                    lockedInstr.push(JSON.parse(JSON.stringify(element)));
                }
            });
            setMyInstruments(lockedInstr);
        } 
        else { //if no elements are present
            //do nothing
        }
    }

    function checkClear(){
        if (myInstruments.length > 0) {
            pushAlert(closeAlert, "Clear List Warning", "Clearing your list will erase all unlocked instruments. Would you like to continue?", "warning", () => {clearList()}, undefined, false)
        }
    }
    //#endregion
    
    //#region Instrument Shuffling
    function instrumentShuffle(instrID) {
      
        if (myInstruments[instrID].locked) {
            pushAlert(closeAlert, "Lock Warning", "This instrument is locked. Please unlock it to shuffle it.", "danger", undefined, undefined, true )
        } else {
            var tempInstruments = [...myInstruments]
            tempInstruments[instrID] = getNewInstrument([]);
            setMyInstruments(tempInstruments)
        }

    }
    //#endregion

    //#region Instrument Locking
    function allElementsLocked(){
        var isLocked = true;
        myInstruments.forEach(element => {
        if (element.locked === false) {
            isLocked = false;
        }
    });
    return isLocked;
    }

    function toggleInstrumentLock(id){
        //get the variables
        var newInstruments = ([...myInstruments])
        var instrument = newInstruments[id]
        //do stuff to instrument
        instrument.locked = !(instrument.locked)
        //reinsert the new instrument into the new array and replace the old array
        newInstruments[id] = instrument;
        setMyInstruments(newInstruments)
 
    }
    //#endregion

    //#region Alert Functions

    const pushAlert = (onClosing, alertHeading, alertText, alertVariant, methodToExecute, buttonText, buttonless) => {
        setAlerts([...alerts, {
            "key": keyInc,
            "onClosing": onClosing,
            "alertHeading": alertHeading,
            "alertText": alertText, 
            "alertVariant": alertVariant, 
            "methodToExecute": methodToExecute,
            "buttonText": buttonText,
            "buttonless": buttonless
        }])

        setKeyInc(keyInc + 1)
    }

    const closeAlert = (id) => {
        setAlerts(alerts.filter((alert) => alert.key !== id))
    }

//#endregion
    
    //#region Check Toggle Functions
    const toggleDupesChecked = () => {
        setDupesChecked(!dupesChecked)
    }
    
    //#endregion

    //#region Instrument Modal Functions
    const openInstrumentModal = () => {
        setShowInstrumentModal(true);
    }
    const closeInstrumentModal = () => {
        setShowInstrumentModal(false);
    }
    const addModalInstrument = (newInstrument) => {
        setMyInstruments([...myInstruments, newInstrument])
    }
    //#endregion

    //#region Replacement Modal Functions
    const openReplacementModal = () => {
        setShowReplacementModal(true);
    }
    const closeReplacementModal = () => {
        setShowReplacementModal(false);
    }
    const replaceInstrument = (oldInstrumentID, newInstrument) => {
        oldInstrumentID = oldInstrumentID.ogInstId
        var tempInstruments = [...myInstruments]
        if(tempInstruments[oldInstrumentID].locked){
            pushAlert(closeAlert, "Lock Warning", "This instrument is locked. Please unlock it to replace it.", "danger", undefined, undefined, true)
        }else{
            tempInstruments[oldInstrumentID] = newInstrument
            setMyInstruments(tempInstruments)
        }
        
    }
    //#endregion

    //#region Template Modal Functions
    
    
    const openTemplateModal = () => {
        setShowTemplateModal(true);
    }
    const closeTemplateModal = () => {
        setShowTemplateModal(false);
    }
    const addTemplate = (template) => {
        
        if(myInstruments.length > 0){
            pushAlert(closeAlert, "Template Warning", "Generating a template will erase all instruments. Would you like to continue?", "warning", () => {templatePop(template)}, undefined, false)
        }else{
            templatePop(template)
        }
    }

    const templatePop = (template) => {
        var newInstruments = []

        template.map(templateI =>{
            getAllInstruments().map(masterI => {
                if (templateI.name === masterI.name) {
                    newInstruments.push(masterI)
                }
            })
        })

        newInstruments.map(instrument =>{
            instrument.locked = false;
        })
        
        setMyInstruments(newInstruments)
    }
    //#endregion

    //#region Export and Import

    function exportJSON(event)  {
        if (myInstruments.length < 1) {
            pushAlert(closeAlert, 'Empty List Error', 'You cannot export an empty list!', 'warning', undefined, undefined, true)
        }else{
            download(Buffer.from(JSON.stringify(myInstruments)).toString('base64'), "MyInstrumentationGenerationList.instrgen")
            //download(JSON.stringify(myInstruments), "MyInstrumentationGenerationList.instrgen")
        }
    }

    function importJSON(input){

        var isValid = true;
        try {
            input=JSON.parse(Buffer.from(input, 'base64').toString('utf-8'))
        } catch (error) {
            isValid=false;
            console.log(error)
        }

        if (input.length > 0 && (input != myInstruments)) {
           
            if (isValid === true) {
            for (let i = 0; i < input.length; i++) { //For each imported instrument
                const importedInstrument = input[i];
                var thisElementValid = false;
                for (let j = 0; j < getAllInstruments().length; j++) { //For each instrument in our database
                    const allInstrumentsInstrument = getAllInstruments()[j];

                    //If our data from our imported instrument matches atleast one instrument from the data
                    var _ = require('lodash');
                    if (_.isEqual(_.omit(importedInstrument, ['locked', 'id']), allInstrumentsInstrument)) {
                        thisElementValid = true;
                    } 
                }
                if (!thisElementValid) {
                   isValid = false; 
                }
            }
            }

            if (isValid) {
                setMyInstruments([...input])
            }else{
                pushAlert(closeAlert, 'Damaged File Error', 'Your file is unreadable, and cannot be imported. The file may have been altered or damaged!', 'warning', undefined, undefined, true)
            }
            
        }
    }
    //#endregion

    function getAllInstruments(){
        var finalList = []
        switch (vocalComplexityState) {
            case 'default':
                finalList = allInstruments.concat(defVocalData)
                break;
            case 'basic':
                finalList = allInstruments.concat(basicVocalData)
                break;
            case 'complex':
                var tempList = [...allInstruments]
                var genList = generateComplexVocalInstruments()
                tempList = tempList.concat(genList)
                finalList = tempList;
                break;
            default: finalList = allInstruments
                break;
        }
        return finalList
    }



    //on load, if a cookie is present, use those instruments to pre populate the instrument list
    useEffect(()=>{
        try{
            var savedInstrumentData = data.userInstrumentList.split(',');
            var newInstruments = [];

            savedInstrumentData.map((instrument)=>{
                getAllInstruments().map((inst2)=>{
                    if (instrument == inst2.name) {
                        var newInstr = inst2;
                        inst2.locked = false;
                        
                        newInstruments.push(newInstr)
                    }
                })
            })

            setMyInstruments(newInstruments)
        }catch (err){
            console.log(err)
        }

    }, [])

    //anytime myInstruments is changed, we set the cookie properly
    useEffect(()=>{
        var instrList = []

        myInstruments.map((instrument) =>{
            instrList.push(instrument.name)
        })
        
        try{
            setCookie("userInstrumentList", instrList.join(), {path: "/", maxAge: 36000, sameSite: true})
        }catch (err){
            console.log(err)
        }
    }, [myInstruments])



    return (
    <div>
        <NextSeo 
            title="Instrumentation Generation" 
            description="A tool for composers to randomly generate groups of instruments to help jumpstart creativity, as well as learn about new instruments."
            openGraph={{
                images: [
                    {
                        url: '/images/header.jpg',
                        width: 800,
                        height: 600,
                        alt: 'Og Image Alt',
                    }
                ],
                site_name: "Instrumentation Generation"
            }}
            />
        {showInstrumentModal ? <InstrumentModal onClose={closeInstrumentModal} instruments={getAllInstruments()} onConfirm={addModalInstrument} /> :  ''}
        {showReplacementModal ? <ReplacementModal onClose={closeReplacementModal} instruments={getAllInstruments()} onConfirm={replaceInstrument} ogInstId={replacementInstrumentID} /> :  ''}
        {showTemplateModal ? <TemplateModal onClose={closeTemplateModal} templates={templates} onConfirm={addTemplate} allInstruments={getAllInstruments()}/> :  ''}
        {alerts.length > 0 ? <Alerts alerts={alerts} onClosing={closeAlert} /> : ''}
        <h1 className={styles.headingOne}>Parameters</h1>
        <ParameterList onRandomList={randomListOfInstruments} onNewList={addNewInstruments} onClear={checkClear} onDupesCheck={toggleDupesChecked} onInstrumentModal={openInstrumentModal} onTemplateModal={openTemplateModal} pushAlert={pushAlert} onTagGen={tagBasedGeneration} onExport={exportJSON} onImport={importJSON} onVocalComplexChange={setVocalComplexityState} vocalComplexityState={vocalComplexityState}></ParameterList>
        <h1 className={styles.headingOne}>Instrument List</h1>
        <InstrumentList instruments = {myInstruments} onDel= {deleteInstrument} onLoc={toggleInstrumentLock} onShuf={instrumentShuffle} onRepButClick={openReplacementModal} setRepInstrumentID={setReplacementInstrumentID} ></InstrumentList>
        
    </div>
  )
}

Home.getInitialProps = async ({req, res}) => {

    const data = parseCookies(req)
   
   return {
     data: data && data,
   }

}

