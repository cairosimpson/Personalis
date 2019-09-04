function updateSheet() {
  const var spreadsheetURL = 'https://docs.google.com/spreadsheets/d/12Lay0askunwT6qqN5c3zIa4eogyUkQiX_q9LM4X__XE/edit#gid=715252624';
  const var sheetNameOG = 'Updated';
  const var sheetNameOmnify = 'Omnify Report';
  
  var SS = SpreadsheetApp.openByUrl(spreadsheetURL); //opens the respective spreadsheets and sheets
  sheetOG = SS.getSheetByName(sheetNameOG);
  sheetOmnify = SS.getSheetByName(sheetNameOmnify);
  
  var numRowsOG = sheetOG.getLastRow();
  var numColsOG = sheetOG.getLastColumn();
  
  var numRowsOmnify = sheetOmnify.getLastRow();
  var numColsOmnify = sheetOmnify.getLastColumn();

  var rangeOG = sheetOG.getRange(1, 1, numRowsOG, numColsOG);
  var rangeOmnify = sheetOmnify.getRange(1, 1, numRowsOmnify, numColsOmnify);
  
  var colNumber = [2]; //will be used to store the column indexes containing the column on each sheet that are compared to match rows (In this case, 'Number')
  var colMatches = [numColsOG];
  var colMatchIndex = 0;
  
  var valuesOG = sheetOG.getRange(1, 1, numRowsOG, numColsOG).getValues();
  var valuesOmnify = sheetOmnify.getRange(1, 1, numRowsOmnify, numColsOmnify).getValues();
  
  for(var i = 0; i < numColsOG; i++){ //this nested loop matches the columns of the two sheets
    for(var j = 0; j < numColsOmnify; j++){
      if(valuesOG[0][i] == valuesOmnify[0][j] ){
        if(valuesOG[0][i] == 'Number'){
          colNumber=[i, j];
        } else{
        var match =[i, j];
        colMatches[colMatchIndex++] = match;
        break;
        }
      }
    }
  }
  
  var rowMatches = [numRowsOG];
  var rowMatchIndex = 0;
  
  for(var i = 1; i < numRowsOG; i++){ //this nested for loop matches the rows of the two sheets
    for(var j = 1; j < numRowsOmnify; j++){
      if(valuesOG[i][ colNumber[0] ] == valuesOmnify[j][ colNumber[1] ]){
        var match  = [i, j];
        rowMatches[rowMatchIndex++] = match;
        break;
      }
    }
  }
  
 var rangeOG = sheetOG.getRange(1, 1, numRowsOG, numColsOG);
  
  for(var i = 0; i < rowMatches.length; i++){ //This nested for loop updates the "Updated" sheet based on values from the 'Omnify Report' sheet
    for(var j = 0; j < colMatches.length; j++){
      var row = rowMatches[i][1] ;
      var col = colMatches[j][1] ;
      var oldVal = rangeOG.getCell(rowMatches[i][0] + 1 , colMatches[j][0] + 1 ).getValue();
      if(valuesOmnify[ row ][ col  ] != ''){
        rangeOG.getCell(rowMatches[i][0] + 1 , colMatches[j][0] + 1 ).setValue(valuesOmnify[rowMatches[i][1]][ colMatches[j][1] ] );  
      }
    }
  }
}