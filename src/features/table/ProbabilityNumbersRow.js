import React from 'react'

import {useSelector} from 'react-redux'

import {selectTableHeadData, selectTableBodyData} from "./tableSlice"

const ProbabilityNumbersRow = () => {

    const tableHeadData = useSelector(selectTableHeadData)
    
    const tableBodyData = useSelector(selectTableBodyData)

  
    let  probabilitiesSuma = 0;
    
    const probabilitySumaList = tableHeadData.map((headCell, index) => {
        
        let suma = 0;

                                //counting probability number for every bodyRow, using credibility, relevance and probability of each hypothesis evidence to count 
                                tableBodyData.forEach(bodyROw =>{

                                    if(suma !== undefined){


                                    let interSuma = 1


                                    //changing probability suma based on compatibility of each evidence with hypothesis
                                    switch (bodyROw.inputCells[index]) {

                                        case "C":
                                        interSuma = 2
                                            break;
                                        case "N":
                                        interSuma = 1
                                            break;
                                        case "I":
                                            interSuma = 0
                                            break;
                                    
                                        default:
                                            interSuma = undefined
                                            break;
                                    }

                                    if(interSuma !== undefined){

                                                //changing probability suma based on credibility
                                                let credibilityNumber = 1
                                                switch (bodyROw.credibility) {
                                                    case "high":
                                                        credibilityNumber = 1.2
                                                        break;
                                                    case "medium":
                                                        credibilityNumber = 1
                                                        break;
                                                    case "low":
                                                        credibilityNumber = 0.8
                                                        break;
                                                
                                                    default:
                                                        break;
                                                }

                                                //changing probability suma based on relevance
                                                let relevanceNumber = 1
                                                switch (bodyROw.relevance) {
                                                    case "high":
                                                        relevanceNumber = 1.2
                                                        break;
                                                    case "medium":
                                                        relevanceNumber = 1
                                                        break;
                                                    case "low":
                                                        relevanceNumber = 0.8
                                                        break;
                                                
                                                    default:
                                                        break;
                                                }

                                                //getting midpoint between credibility and relevance vaues to change porbability suma number accordingly
                                                const credibilityRelevanceMidpoint = relevanceNumber + credibilityNumber / 2
                                                
                                                suma += interSuma * credibilityRelevanceMidpoint

                                                console.log("first suma", suma);

                                    }else{
                                        suma = undefined
                                    }

                                }
                                    })

            if(suma !== undefined){                      
            
            probabilitiesSuma += suma;
            }

        return suma
    });



  return (
    <>
    {probabilitySumaList.map(probabilitySuma => {
        if(probabilitySuma !== undefined){
            const probabilitySumaPercentage = probabilitySuma / probabilitiesSuma * 100
            
           

            let probabilitySumaPercentageFloored =  Math.floor(probabilitySumaPercentage * 100) / 100

            if( isNaN(probabilitySumaPercentageFloored)){
                probabilitySumaPercentageFloored = 0;
            }
    
            return <th>{probabilitySumaPercentageFloored + "%"}</th>
    }else{
        return <th>can not be counted</th>
    }
    })}
    </>
  )
}

export default ProbabilityNumbersRow













// let probabilityNumbers = []


// let probabilityNumber = 0

// tableBodyData.forEach(tableRow => {
   

//    if(probabilityNumber !== undefined){

//            console.log('aaaoooo', tableRow.credibility, tableRow.relevance);

//            let credibilityNumber = 1;
//            if (tableRow.credibility === "high") {
//                credibilityNumber = 1.25
//            }
//            else if(tableRow.credibility === "medium"){
//                credibilityNumber = 1
//            }
//            else if (tableRow.credibility === "low"){
//                credibilityNumber = 0.75
//            }
//            else{
//                credibilityNumber = undefined
//            }


//            let relevanceNumber = 1;
//            if(tableRow.relevance === "high") {
//                relevanceNumber = 1.25
//            }
//            else if(tableRow.relevance === "medium"){
//                relevanceNumber = 1
//            }
//            else if (tableRow.relevance === "low"){
//                relevanceNumber = 0.75
//            }
//            else{
//                relevanceNumber = undefined
//            }

//            let credibilityRelevanceNumberMidpoint = 1
//            if(relevanceNumber !== undefined && credibilityNumber !== undefined){
//                credibilityRelevanceNumberMidpoint = relevanceNumber + credibilityNumber / 2
//            }

//            if (tableRow.inputCells[index] === "C") {
//                probabilityNumber += 2
//            }
//            else if(tableRow.inputCells[index] === "N"){
//                probabilityNumber += 1
//            }
//            else if (tableRow.inputCells[index] === "I"){
//                probabilityNumber += 0
//            }
//            else{
//                probabilityNumber = undefined
//            }

           
//            if(probabilityNumber !== undefined){
//                probabilityNumber = probabilityNumber * credibilityRelevanceNumberMidpoint
//            }
           

           

//        }
// })

// if(probabilityNumber !== undefined){
// sumOfProbabilities += probabilityNumber
// }

// })



// const probabilitesNumbers = tableHeadData.map((tableHeadLowerRowCell, index) => {
               
               
// //probability number is a summed numbered probability of every hypothesis
// let probabilityNumber = 0


// //TODO: Change and do differently
// tableBodyData.forEach(tableRow => {    

   
//    if(probabilityNumber !== undefined){
//            if (tableRow.inputCells[index] === "C") {

//                probabilityNumber += 2
//            }
//            else if(tableRow.inputCells[index] === "N"){
//                probabilityNumber += 1
//            }
//            else if (tableRow.inputCells[index] === "I"){
//                probabilityNumber += 0
//            }
//            else{
//                probabilityNumber = undefined;
//            }
//    }
// })

// const probabilityPercentage =probabilityNumber * 100 / sumOfProbabilities
// const probabilityPercentageRoundedToTwoDecimals = Math.floor((probabilityPercentage) * 100) / 100;
// return <th>{probabilityNumber !== undefined ? probabilityPercentageRoundedToTwoDecimals + " %" : "Can not be counted"}</th>
// })