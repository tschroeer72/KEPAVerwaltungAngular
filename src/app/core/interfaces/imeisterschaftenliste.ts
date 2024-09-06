export interface IMeisterschaftenliste {
    ID: number,
    Bezeichnung: string,
    Beginn: Date,
    Ende: Date, //| undefined,
    MeisterschaftstypID: number,
    Meisterschaftstyp: string,
    Aktiv: number
}

export interface IMeisterschaftstyp{
    ID: number,
    Meisterschaftstyp: string
}