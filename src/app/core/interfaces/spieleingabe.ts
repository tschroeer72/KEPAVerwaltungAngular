import { HinRueckrunde } from "../enums/hinrueckrunde"

export interface INeunerRattenEingabe {
    ID: number,
    SpielerID: number,
    SpielerName: string,
    Neuner: number,
    Ratten: number
}

export interface INeunerRattenAusgabe {
    ID: number,
    SpieltagID: number,
    SpielerID: number,
    Spielername: string,
    Neuner: number,
    Ratten: number
}

export interface I6TageRennenEingabe {
    ID: number,
    Spieler1ID: number,
    SpielerName1: string,
    Spieler2ID: number,
    SpielerName2: string,
    Runden: number,
    Punkte: number
}

export interface I6TageRennenAusgabe {
    ID: number,
    SpieltagID: number,
    Spieler1ID: number,
    SpielerName1: string,
    Spieler2ID: number,
    SpielerName2: string,
    Runden: number,
    Punkte: number
}

export interface IPokalEingabe {
    ID: number,
    SpielerID: number,
    SpielerName: string,
    Platzierung: number
}

export interface IPokalAusgabe {
    ID: number,
    SpieltagID: number,
    SpielerID: number,
    Spielername: string,
    Platzierung: number
}

export interface ISargkegelnEingabe {
    ID: number,
    SpielerID: number,
    SpielerName: string,
    Platzierung: number
}

export interface ISargkegelnAusgabe {
    ID: number,
    SpieltagID: number,
    SpielerID: number,
    Spielername: string,
    Platzierung: number
}

export interface IMeisterschaftEingabe {
    ID: number,
    SpielerID1: number,
    SpielerName1: string,
    SpielerID2: number,
    SpielerName2: string,
    HolzSpieler1: number,
    HolzSpieler2: number,
    HinRueckrunde: HinRueckrunde
}

export interface IMeisterschaftAusgabe {
    ID: number,
    SpielerID1: number,
    SpielerName1: string,
    SpielerID2: number,
    SpielerName2: string,
    HolzSpieler1: number,
    HolzSpieler2: number,
    HinRueckrunde: HinRueckrunde
}

export interface IBlitztunierEingabe {
    ID: number,
    SpielerID1: number,
    SpielerName1: string,
    SpielerID2: number,
    SpielerName2: string,
    PunkteSpieler1: number,
    PunkteSpieler2: number,
    HinRueckrunde: HinRueckrunde
}

export interface IBlitztunierAusgabe {
    ID: number,
    SpielerID1: number,
    SpielerName1: string,
    SpielerID2: number,
    SpielerName2: string,
    PunkteSpieler1: number,
    PunkteSpieler2: number,
    HinRueckrunde: HinRueckrunde
}

export interface IKombimeisterschaftEingabe {
    ID: number,
    SpielerID1: number,
    SpielerName1: string,
    SpielerID2: number,
    SpielerName2: string,
    Spieler1Punkte3bis8: number,
    Spieler1Punkte5Kugeln:number,
    Spieler2Punkte3bis8: number,
    Spieler2Punkte5Kugeln:number,
    HinRueckrunde: HinRueckrunde
}

export interface IKombimeisterschaftAusgabe {
    ID: number,
    SpielerID1: number,
    SpielerName1: string,
    SpielerID2: number,
    SpielerName2: string,
    Spieler1Punkte3Bbis8: number,
    Spieler1Punkte5Kugeln:number,
    Spieler2Punkte3Bbis8: number,
    Spieler2Punkte5Kugeln:number,
    HinRueckrunde: HinRueckrunde
}