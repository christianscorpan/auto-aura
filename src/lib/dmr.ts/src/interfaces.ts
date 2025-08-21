export interface InspectionData {
  date: Date | null;
  status: string | null;
}

export interface VehicleBasicData {
  vin: string | null;
  brand?: string | null;
  model?: string | null;
  variant?: string | null;
  type?: string | null;
  lastChange?: Date | null;
}

export interface RegistrationData {
  registrationNumber?: string | null;
  firstRegistrationDate?: Date | null;
  usage?: string | null;
  lastChange?: string | null;
}

export interface DispensationData {
  taxi: boolean | null;
  dispensations: string | null;
  leasing: string | null;
}

export interface InsuranceData {
  company?: string | null;
  is_active?: boolean | null;
  number?: string | null;
  created?: Date | null;
}

export interface VisKTData {
  lblSupplAnven?: {
    description: string;
    value: string | null;
  };
  lblStatus?: {
    description: string;
    value: string | null;
  };
  lblType?: {
    description: string;
    value: string | null;
  };
  lblEUVar?: {
    description: string;
    value: string | null;
  };
  lblEUVer?: {
    description: string;
    value: string | null;
  };
  lblKategori?: {
    description: string;
    value: string | null;
  };
  lblFabrikant?: {
    description: string;
    value: string | null;
  };
  lblAnmodVfAarsag?: {
    description: string;
    value: string | null;
  };
  lblAnmodVfKm?: {
    description: string;
    value: number | null;
  };
  lblAnmodVfKtStand?: {
    description: string;
    value: string | null;
  };
  lblKID?: {
    description: string;
    value: number | null;
  };
  lblStelnumSidevogn?: {
    description: string;
    value: string | null;
  };
  lblFarve?: {
    description: string;
    value: string | null;
  };
  lblModelAar?: {
    description: string;
    value: string | null;
  };
  lblRegDato?: {
    description: string;
    value: Date | null;
  };
  lblIbrugtagningDato?: {
    description: string;
    value: string | null;
  };
  lblNCAP?: {
    description: string;
    value: boolean | null;
  };
  lblFuelmode?: {
    description: string;
    value: string | null;
  };
  lblVejvenligLuftaffjedring?: {
    description: string;
    value: string | null;
  };
  lblKilometerStand?: {
    description: string;
    value: number | null;
  };
  lblKilometerStandDokumentation?: {
    description: string;
    value: string | null;
  };
  lblAndreBem?: {
    description: string;
    value: string | null;
  };
  lblKTStand?: {
    description: string;
    value: string | null;
  };
  lblTrafikskade?: {
    description: string;
    value: string | null;
  };
  lblAndetUdstyr?: {
    description: string;
    value: string | null;
  };
  lblTekTotVgt?: {
    description: string;
    value: { numeric: number; unit: string; } | null;
  };
  lblTtlVgt?: {
    description: string;
    value: { numeric: number; unit: string; } | null;
  };
  lblEgnVgt?: {
    description: string;
    value: { numeric: number; unit: string; } | null;
  };
  lblMin?: {
    description: string;
    value: string | null;
  };
  lblMax?: {
    description: string;
    value: string | null;
  };
  lblVVrdLftAffj?: {
    description: string;
    value: string | null;
  };
  lblVVrdMekAffj?: {
    description: string;
    value: string | null;
  };
  lblVgntgVgt?: {
    description: string;
    value: string | null;
  };
  lblSkmlBlstn?: {
    description: string;
    value: string | null;
  };
  lblTlkbAnrdn?: {
    description: string;
    value: boolean | null;
  };
  lblMedBrms?: {
    description: string;
    value: string | null;
  };
  lblUdBrms?: {
    description: string;
    value: string | null;
  };
  lblTtlvgtPhngsvgn?: {
    description: string;
    value: string | null;
  };
  lblMrkng?: {
    description: string;
    value: string | null;
  };
  lblDrvKrft?: {
    description: string;
    value: string | null;
  };
  lblPluginHybrid?: {
    description: string;
    value: boolean | null;
  };
  lblSlgVlmn?: {
    description: string;
    value: string | null;
  };
  lblSrstEffkt?: {
    description: string;
    value: string | null;
  };
  lblAntlClndr?: {
    description: string;
    value: number | null;
  };
  lblMaaleNorm?: {
    description: string;
    value: string | null;
  };
  lblBraendstofForbrugMaalt?: {
    description: string;
    value: string | null;
  };
  lblElektriskForbrugMaalt?: {
    description: string;
    value: string | null;
  };
  lblCO2Udslp?: {
    description: string;
    value: string | null;
  };
  lblBrndsffrbrg?: {
    description: string;
    value: { numeric: number; unit: string; } | null;
  };
  lblElektriskForbrug?: {
    description: string;
    value: string | null;
  };
  lblBeregnetBrndsffrbrg?: {
    description: string;
    value: { numeric: number; unit: string; } | null;
  };
  lblMxHstghd?: {
    description: string;
    value: string | null;
  };
  lblElektriskRaekkevidde?: {
    description: string;
    value: string | null;
  };
  lblBatteriKapacitet?: {
    description: string;
    value: string | null;
  };
  lblCO2UdslipBeregnet?: {
    description: string;
    value: string | null;
  };
  lblKrsrTpe?: {
    description: string;
    value: string | null;
  };
  lblSpplKrsrTpe?: {
    description: string;
    value: string | null;
  };
  lblAntlDre?: {
    description: string;
    value: number | null;
  };
  lblFlgDk?: {
    description: string;
    value: string | null;
  };
  lblSprVddnFr?: {
    description: string;
    value: string | null;
  };
  lblSprVddnBg?: {
    description: string;
    value: string | null;
  };
  lblStlNrAnbrgls?: {
    description: string;
    value: string | null;
  };
  lblPsgrAntl?: {
    description: string;
    value: string | null;
  };
  lblSdPldsMn?: {
    description: string;
    value: string | null;
  };
  lblSdPldsMks?: {
    description: string;
    value: string | null;
  };
  lblStpldsrMn?: {
    description: string;
    value: string | null;
  };
  lblStpldsrMks?: {
    description: string;
    value: string | null;
  };
  lblAntl?: {
    description: string;
    value: number | null;
  };
  lblAfstnd?: {
    description: string;
    value: string | null;
  };
  lblNr?: {
    description: string;
    value: number | null;
  };
  lblSrstTrk?: {
    description: string;
    value: string | null;
  };
  lblTlldtTrk?: {
    description: string;
    value: string | null;
  };
  lblVgntgAkslAntl?: {
    description: string;
    value: string | null;
  };
  lblVgntgAksltrk?: {
    description: string;
    value: string | null;
  };
  lblRgtthd?: {
    description: string;
    value: string | null;
  };
  lblVed?: {
    description: string;
    value: string | null;
  };
  lblCO?: {
    description: string;
    value: string | null;
  };
  lblHC?: {
    description: string;
    value: string | null;
  };
  lblNOX?: {
    description: string;
    value: string | null;
  };
  lblPrtklr?: {
    description: string;
    value: string | null;
  };
  lblPrtklfltr?: {
    description: string;
    value: string | null;
  };
  lblEftrMntrtPrtklfltr?: {
    description: string;
    value: string | null;
  };
  lblKoeretoejGruppe?: {
    description: string;
    value: string | null;
  };
  lblKoeretoejUndergruppe?: {
    description: string;
    value: string | null;
  };
  lblSpecifikCO2Emission?: {
    description: string;
    value: string | null;
  };
  lblNyttelastvaerdi?: {
    description: string;
    value: string | null;
  };
  lblNulemissionskoeretoej?: {
    description: string;
    value: string | null;
  };
  lblSovekabine?: {
    description: string;
    value: string | null;
  };
  lblCO2EmissionsKlasse?: {
    description: string;
    value: string | null;
  };
  lblOmklassificeringsdato?: {
    description: string;
    value: string | null;
  };
  lblEffektivitetsForholdRelevant?: {
    description: string;
    value: string | null;
  };
  lblVolumenorientering?: {
    description: string;
    value: string | null;
  };
  lblEffektivitetsForholdM3?: {
    description: string;
    value: string | null;
  };
  lblEffektivitetsForholdTon?: {
    description: string;
    value: string | null;
  };
  lblStndStj?: {
    description: string;
    value: string | null;
  };
  lblStndStjVed?: {
    description: string;
    value: string | null;
  };
  lblKrslsstj?: {
    description: string;
    value: string | null;
  };
  lblErnrm?: {
    description: string;
    value: string | null;
  };
  lblInnvtvTknk?: {
    description: string;
    value: boolean | null;
  };
  lblCO2Sprs?: {
    description: string;
    value: string | null;
  };
  lblFra?: {
    description: string;
    value: string | null;
  };
  lblTil?: {
    description: string;
    value: string | null;
  };
}

export interface OpretKTData {
  chk1Eller2KlimaZone?: {
    description: string;
    value: boolean | null;
  };
  chk3Eller4ZoneKlima?: {
    description: string;
    value: boolean | null;
  };
  chkAfstandsradar?: {
    description: string;
    value: boolean | null;
  };
  chkFartpilot?: {
    description: string;
    value: boolean | null;
  };
  chkBakkamera?: {
    description: string;
    value: boolean | null;
  };
  chkElopvarmetForrude?: {
    description: string;
    value: boolean | null;
  };
  chkElektriskBagklap?: {
    description: string;
    value: boolean | null;
  };
  chkElektriskLukningAfDoere?: {
    description: string;
    value: boolean | null;
  };
  chkHeadUpDisplay?: {
    description: string;
    value: boolean | null;
  };
  chkHiFiMusikanlaeg?: {
    description: string;
    value: boolean | null;
  };
  chkKeyLessGoNoeglefri?: {
    description: string;
    value: boolean | null;
  };
  chkLinievogter?: {
    description: string;
    value: boolean | null;
  };
  chkKlimaanlaegManuel?: {
    description: string;
    value: boolean | null;
  };
  chkNatsynsudstyr?: {
    description: string;
    value: boolean | null;
  };
  chkNavigationssystem?: {
    description: string;
    value: boolean | null;
  };
  chkOriginalTyverialarm?: {
    description: string;
    value: boolean | null;
  };
  chkParkeringsassistent?: {
    description: string;
    value: boolean | null;
  };
  chkParkeringskontrolBag?: {
    description: string;
    value: boolean | null;
  };
  chkParkeringskontrolFor?: {
    description: string;
    value: boolean | null;
  };
  chkSolcellekoeling?: {
    description: string;
    value: boolean | null;
  };
  chkStemmestyring?: {
    description: string;
    value: boolean | null;
  };
  chkVognbaneskiftAlarm?: {
    description: string;
    value: boolean | null;
  };
  chkSaederaekker?: {
    description: string;
    value: boolean | null;
  };
  chkDobbeltkabine?: {
    description: string;
    value: boolean | null;
  };
  chkElSoltag?: {
    description: string;
    value: boolean | null;
  };
  chkSiderudeVarerum?: {
    description: string;
    value: boolean | null;
  };
  chkGlastag?: {
    description: string;
    value: boolean | null;
  };
  chkKurvelys?: {
    description: string;
    value: boolean | null;
  };
  chkMetalfoldetag?: {
    description: string;
    value: boolean | null;
  };
  chkMetallak?: {
    description: string;
    value: boolean | null;
  };
  chkOmbyggetKarrosseri?: {
    description: string;
    value: boolean | null;
  };
  chkTarga?: {
    description: string;
    value: boolean | null;
  };
  chkXenonLys?: {
    description: string;
    value: boolean | null;
  };
  chk6GearManuel?: {
    description: string;
    value: boolean | null;
  };
  chkEspElektroniskStabiliseringsProgram?: {
    description: string;
    value: boolean | null;
  };
  chkKompressor?: {
    description: string;
    value: boolean | null;
  };
  chkBraendstoffyr?: {
    description: string;
    value: boolean | null;
  };
  chkMotornummer?: {
    description: string;
    value: boolean | null;
  };
  chkTunetMotor?: {
    description: string;
    value: boolean | null;
  };
  chkAbsBremser?: {
    description: string;
    value: boolean | null;
  };
  chkKeramiskeSkiver?: {
    description: string;
    value: boolean | null;
  };
  chkSkivebremserBag?: {
    description: string;
    value: boolean | null;
  };
  chkSkivebremserFor?: {
    description: string;
    value: boolean | null;
  };
  chkAffjedretStel?: {
    description: string;
    value: boolean | null;
  };
  chkElektroniskDaempere?: {
    description: string;
    value: boolean | null;
  };
  chkLuftaffjedring?: {
    description: string;
    value: boolean | null;
  };
  chkNiveauregulering?: {
    description: string;
    value: boolean | null;
  };
  chkOmbyggetStel?: {
    description: string;
    value: boolean | null;
  };
  chkStiftStel?: {
    description: string;
    value: boolean | null;
  };
  chkHjulStoerreEnd20In?: {
    description: string;
    value: boolean | null;
  };
  chkRadio?: {
    description: string;
    value: boolean | null;
  };
  chkTrinloestGear?: {
    description: string;
    value: boolean | null;
  };
  chkFirehjulstraek?: {
    description: string;
    value: boolean | null;
  };
  chkRatbetjentGear?: {
    description: string;
    value: boolean | null;
  };
  chkLaedersaeder?: {
    description: string;
    value: boolean | null;
  };
  chkElGardinerBagdoere?: {
    description: string;
    value: boolean | null;
  };
  chkElGardinerBagrude?: {
    description: string;
    value: boolean | null;
  };
  chkElIndstSaederBag?: {
    description: string;
    value: boolean | null;
  };
  chkFasteSidetasker?: {
    description: string;
    value: boolean | null;
  };
  chkRuskindAlcantara?: {
    description: string;
    value: boolean | null;
  };
  chkSaedemassage?: {
    description: string;
    value: boolean | null;
  };
  chkMemorySaederFor?: {
    description: string;
    value: boolean | null;
  };
  chkSportssaeder?: {
    description: string;
    value: boolean | null;
  };
  chkVentilationISaeder?: {
    description: string;
    value: boolean | null;
  };
  chkElIndstilleligtRat?: {
    description: string;
    value: boolean | null;
  };
  chkHoejrestyring?: {
    description: string;
    value: boolean | null;
  };
  chkLangForgaffel?: {
    description: string;
    value: boolean | null;
  };
  chkMultifunktionsrat?: {
    description: string;
    value: boolean | null;
  };
  chkOpvarmetRat?: {
    description: string;
    value: boolean | null;
  };
  chkTurbo?: {
    description: string;
    value: boolean | null;
  };
}

export interface VehicleData {
  vehicle?: VehicleBasicData | null;
  registration?: RegistrationData | null;
  visKT?: VisKTData | null;
  opretKT?: OpretKTData | null;
  insurance?: InsuranceData | null;
  inspections?: InspectionData[] | null;
  dispensations?: DispensationData | null;
}
