
const Excel = require('exceljs')


const parseAnimeXLSX = async (path) => {
    var Workbook = new Excel.Workbook()
    var data = await Workbook.xlsx.readFile(path);
    var worksheet = data.getWorksheet(1);
    var columnsRow = worksheet.getRow(1);
    var columnsTitle = columnsRow.values.slice(1)
    var Rows = worksheet.getRows(2, worksheet.rowCount)


    let result = {data: [], format:[]}

    
    columnsTitle.map((item) => {
        
        var rowFormat = {
            field: item,
            headerText: item,
            width: 300,
            textAlign: 'left'
        }

        result.format.push(rowFormat)
    })

    var isObject = []
    Rows.map((row, id) => {
        var rowValue = row.values.splice(1)
        var rowObj = {}
        
        if(rowValue.length > 0){

            columnsTitle.map((item, i) => {
                if(id === 0){
                    isObject[i] = typeof rowValue[i] === 'object'
                }

                
                rowObj[item] = rowValue[i]
                rowObj['id'] = id;
                if(isObject[i] && id !== 0){
                    
                    rowObj[item] = rowValue[i].hyperlink ? rowValue[i] : {text: rowValue[i], hyperlink: ''}
                }
    
            })
            result.data.push(rowObj)
        }
    })
    return result

    
}

exports.Parser = {
    parseAnimeXLSX 
}