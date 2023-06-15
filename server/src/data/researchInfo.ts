import { Row, Workbook } from "exceljs"
import { resolve } from "path";

class Student {
    constructor(
        public readonly name: string,
        public readonly code: string
    ) { }
}

class Research {
    constructor(
        public readonly name: string,
        public readonly category: string,
        public readonly school: string,
        public readonly students: Student[]
    ) { }

    addStudent(student: Student) {
        this.students.push(student)
    }
}

const researchInfo: Research[] = []

;(async () => {
    const workbook = new Workbook()
    const worksheet = await workbook.xlsx.readFile(resolve(__dirname, "./research.xlsx"))
    const sheet = worksheet.getWorksheet(1)
    sheet.eachRow((row, rowNumber) => {
        if (rowNumber === 1) return
        const getValue = (i: number) => row.getCell(i).value?.toString()
        const category = getValue(10)   
        if (!category) return
        if (researchInfo.at(-1)?.category === category) {
            researchInfo.at(-1)?.addStudent(new Student(getValue(7) as string, getValue(14) as string))
        }
        else {
            researchInfo.push(new Research(getValue(12) as string, category, getValue(4) as string, [new Student(getValue(7) as string, getValue(14) as string)]))
        }
    })
    researchInfo.sort((a, b) => a.category > b.category ? 1 : -1)
})()

const checkDone = async (code: string) => {
    const workbook = new Workbook()
    const worksheet = await workbook.xlsx.readFile(resolve(__dirname, "./research.xlsx"))
    const sheet = worksheet.getWorksheet(1)
    const row = sheet.getRows(1, 150)?.find((row) => row.getCell(14).value?.toString() === code) as Row
    if (row.getCell(15).value === undefined) return false
    return true    
}

const vote = async (code: string, vote: { first: Research[], second: Research }) => {
    const workbook = new Workbook()
    const worksheet = await workbook.xlsx.readFile(resolve(__dirname, "./research.xlsx"))
    const sheet = worksheet.getWorksheet(1)
    const row = sheet.getRows(1, 150)?.find((row) => row.getCell(14).value?.toString() === code) as Row
    row.getCell(15).value = vote.first[0].category
    row.getCell(16).value = vote.first[1].category
    row.getCell(17).value = vote.second.category
    workbook.xlsx.writeFile(resolve(__dirname, "./research.xlsx"))
}

export { type Research, type Student, researchInfo, checkDone, vote }