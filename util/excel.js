const fs = require('fs');
const reader = require('exceljs');

exports.addToExcel = async (filePath, sheetName, headers, data) => {
    try {
        let workbook;
        if (fs.existsSync(filePath)) {
            workbook = new reader.Workbook();
            await workbook.xlsx.readFile(filePath);
        } else {
            workbook = new reader.Workbook();
        }

        let worksheet = workbook.getWorksheet(sheetName);
        if (!worksheet) {
            worksheet = workbook.addWorksheet(sheetName);
            worksheet.addRow(headers);
        }
        worksheet.addRow(data);

        await workbook.xlsx.writeFile(filePath);

    } catch(err){
        throw new Error("Excel Read/Write Error")
    }

}

exports.readExcelFile = async filePath => {
  const workbook = new reader.Workbook();

  try {
    await workbook.xlsx.readFile(filePath);

    const result = [];

    workbook.eachSheet((worksheet, sheetId) => {
      const sheetData = [];

      worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
        sheetData.push(row.values);
      });

      result.push({ sheet: worksheet.name, data: sheetData });
    });

    const headers = result?.[0]?.data?.slice(0,1)?.map(el => el?.filter(Boolean))
    const rows = result?.[0]?.data?.slice(1)?.map(el => el?.filter(Boolean))

    let data = []
    rows?.map(row => {
        const obj = {}
        row?.map((el, i) => { obj[headers[0][i]] = el })
        console.log(obj)
        data?.push( obj )
    })
    return data
  } catch (error) {
    throw new Error ('Error reading Excel file: ' +  error.message)
  }
}

