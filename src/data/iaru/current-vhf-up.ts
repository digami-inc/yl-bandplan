import type { IaruSegment } from "../types";

const SOURCE_ID = "iaru-r1-vhf-up";
const HANDBOOK = "IARU Region 1 VHF+ Handbook 10.03 (February 2026)";
const UHF_2023 = "IARU Region 1 Zlatibor 2023 ZL23_C5_Rec_06; VHF+ Handbook 10.03";

function segment(
  id: string,
  bandId: string,
  fromHz: number,
  toHz: number,
  modes: string[],
  maxBandwidthHz?: number,
  usage?: string[],
  sourceReference = HANDBOOK,
): IaruSegment {
  return {
    id,
    bandId,
    fromHz,
    toHz,
    ...(maxBandwidthHz === undefined ? {} : { maxBandwidthHz }),
    modes,
    ...(usage?.length ? { usage } : {}),
    sourceId: SOURCE_ID,
    sourceReference,
  };
}

/** 430-440 MHz: materially revised at the 2023 IARU Region 1 conference. */
export const current70cmSegments: IaruSegment[] = [
  segment("iaru-70cm-current-001", "70cm", 430_000_000, 432_000_000, ["All modes"], undefined, undefined, UHF_2023),
  segment("iaru-70cm-current-002", "70cm", 432_000_000, 432_400_000, ["All modes"], 2_700, ["CW", "SSB", "MGM"], UHF_2023),
  segment("iaru-70cm-current-003", "70cm", 432_400_000, 432_490_000, ["Telegraphy", "MGM"], 500, ["Beacons exclusive"], UHF_2023),
  segment("iaru-70cm-current-004", "70cm", 432_491_000, 432_493_000, ["Experimental MGM"], 500, undefined, UHF_2023),
  segment("iaru-70cm-current-005", "70cm", 432_500_000, 432_987_500, ["All modes"], undefined, undefined, UHF_2023),
  segment("iaru-70cm-current-006", "70cm", 433_000_000, 433_387_500, ["FM", "Digital voice"], undefined, ["Repeaters"], UHF_2023),
  segment("iaru-70cm-current-007", "70cm", 433_400_000, 433_587_500, ["FM", "Digital voice"], undefined, ["Simplex"], UHF_2023),
  segment("iaru-70cm-current-008", "70cm", 433_600_000, 434_000_000, ["All modes"], undefined, ["Digital communications"], UHF_2023),
  segment("iaru-70cm-current-009", "70cm", 434_000_000, 434_587_500, ["All modes"], undefined, ["DATV / digital communications by national planning"], UHF_2023),
  segment("iaru-70cm-current-010", "70cm", 434_600_000, 434_987_500, ["All modes"], undefined, ["Repeater outputs"], UHF_2023),
  segment("iaru-70cm-current-011", "70cm", 435_000_000, 436_000_000, ["Amateur satellite service"], undefined, undefined, UHF_2023),
  segment("iaru-70cm-current-012", "70cm", 436_000_000, 438_000_000, ["Amateur satellite service", "Digital television"], undefined, undefined, UHF_2023),
  segment("iaru-70cm-current-013", "70cm", 438_000_000, 440_000_000, ["All modes"], undefined, ["Sub-regional channel planning"], UHF_2023),
];

/** Current published 1200-1300 MHz plan. WRC-23/RNSS work may lead to a future revision. */
export const current23cmSegments: IaruSegment[] = [
  segment("iaru-23cm-current-001", "23cm", 1_240_000_000, 1_240_500_000, ["All modes"], 2_700, ["Reserved for future"]),
  segment("iaru-23cm-current-002", "23cm", 1_240_500_000, 1_240_750_000, ["Telegraphy", "MGM"], 500, ["Beacons; reserved for future"]),
  segment("iaru-23cm-current-003", "23cm", 1_240_750_000, 1_241_000_000, ["FM", "Digital voice"], 20_000, ["Reserved for future"]),
  segment("iaru-23cm-current-004", "23cm", 1_241_000_000, 1_243_250_000, ["All modes"], 20_000, ["Digital communications and repeater outputs"]),
  segment("iaru-23cm-current-005", "23cm", 1_243_250_000, 1_260_000_000, ["ATV", "Digital ATV"], undefined, ["Bandwidth according to national regulations"]),
  segment("iaru-23cm-current-006", "23cm", 1_260_000_000, 1_270_000_000, ["Amateur satellite service"], undefined, ["Bandwidth according to national regulations"]),
  segment("iaru-23cm-current-007", "23cm", 1_270_000_000, 1_272_000_000, ["All modes"], 20_000, ["Repeater inputs and digital communications"]),
  segment("iaru-23cm-current-008", "23cm", 1_272_000_000, 1_290_994_000, ["ATV", "Digital ATV"], undefined, ["Bandwidth according to national regulations"]),
  segment("iaru-23cm-current-009", "23cm", 1_290_994_000, 1_291_481_000, ["FM", "Digital voice"], 20_000, ["Repeater inputs"]),
  segment("iaru-23cm-current-010", "23cm", 1_291_494_000, 1_296_000_000, ["All modes"], undefined, ["Bandwidth according to national regulations"]),
  segment("iaru-23cm-current-011", "23cm", 1_296_000_000, 1_296_150_000, ["Telegraphy", "MGM"], 500, ["1296.000-1296.025 MHz EME"]),
  segment("iaru-23cm-current-012", "23cm", 1_296_150_000, 1_296_800_000, ["Telegraphy", "SSB", "MGM"], 2_700, ["Narrow-band operation"]),
  segment("iaru-23cm-current-013", "23cm", 1_296_800_000, 1_296_994_000, ["Telegraphy", "MGM"], 500, ["Beacons exclusive"]),
  segment("iaru-23cm-current-014", "23cm", 1_296_994_000, 1_297_481_000, ["FM", "Digital voice"], 20_000, ["Repeater outputs"]),
  segment("iaru-23cm-current-015", "23cm", 1_297_494_000, 1_297_981_000, ["FM", "Digital voice"], 20_000, ["Simplex"]),
  segment("iaru-23cm-current-016", "23cm", 1_298_000_000, 1_299_000_000, ["All modes"], 20_000, ["Mixed analogue or digital use"]),
  segment("iaru-23cm-current-017", "23cm", 1_299_000_000, 1_299_750_000, ["All modes"], 150_000, ["High-speed digital data"]),
  segment("iaru-23cm-current-018", "23cm", 1_299_750_000, 1_300_000_000, ["All modes"], 20_000, ["FM / digital voice channels"]),
];

export const current9cmSegments: IaruSegment[] = [
  segment("iaru-9cm-current-001", "9cm", 3_400_000_000, 3_400_800_000, ["All modes"], undefined, ["3400.100 MHz activity / EME centre; 3400.750-3400.800 MHz local beacons"]),
  segment("iaru-9cm-current-002", "9cm", 3_400_800_000, 3_400_995_000, ["All modes"], undefined, ["Beacons only"]),
  segment("iaru-9cm-current-003", "9cm", 3_401_000_000, 3_402_000_000, ["All modes"]),
  segment("iaru-9cm-current-004", "9cm", 3_402_000_000, 3_410_000_000, ["All modes"], undefined, ["Satellite downlinks"]),
  segment("iaru-9cm-current-005", "9cm", 3_410_000_000, 3_475_000_000, ["All modes"]),
];

export const current6cmSegments: IaruSegment[] = [
  segment("iaru-6cm-current-001", "6cm", 5_650_000_000, 5_668_000_000, ["All modes"], undefined, ["Amateur satellite service uplink"]),
  segment("iaru-6cm-current-002", "6cm", 5_668_000_000, 5_670_000_000, ["All modes"], undefined, ["5668.200 MHz narrow-band centre; amateur satellite uplink"]),
  segment("iaru-6cm-current-003", "6cm", 5_670_000_000, 5_700_000_000, ["MGM"]),
  segment("iaru-6cm-current-004", "6cm", 5_700_000_000, 5_760_000_000, ["All modes"]),
  segment("iaru-6cm-current-005", "6cm", 5_760_000_000, 5_760_800_000, ["All modes"], 2_700, ["5760.200 MHz narrow-band centre; local beacons 5760.750-5760.800"]),
  segment("iaru-6cm-current-006", "6cm", 5_760_800_000, 5_760_990_000, ["Telegraphy", "MGM"], undefined, ["Beacons only"]),
  segment("iaru-6cm-current-007", "6cm", 5_761_000_000, 5_762_000_000, ["All modes"]),
  segment("iaru-6cm-current-008", "6cm", 5_762_000_000, 5_830_000_000, ["All modes"]),
  segment("iaru-6cm-current-009", "6cm", 5_830_000_000, 5_850_000_000, ["All modes"], undefined, ["Amateur satellite service downlink"]),
];

export const current3cmSegments: IaruSegment[] = [
  segment("iaru-3cm-current-001", "3cm", 10_000_000_000, 10_150_000_000, ["MGM"]),
  segment("iaru-3cm-current-002", "3cm", 10_150_000_000, 10_250_000_000, ["All modes"]),
  segment("iaru-3cm-current-003", "3cm", 10_250_000_000, 10_350_000_000, ["MGM"]),
  segment("iaru-3cm-current-004", "3cm", 10_350_000_000, 10_368_000_000, ["All modes"]),
  segment("iaru-3cm-current-005", "3cm", 10_368_000_000, 10_368_800_000, ["All modes"], 2_700, ["10368.200 MHz narrow-band centre; local beacons 10368.750-10368.800"]),
  segment("iaru-3cm-current-006", "3cm", 10_368_800_000, 10_368_990_000, ["Beacons"], undefined, ["Beacons only"]),
  segment("iaru-3cm-current-007", "3cm", 10_369_000_000, 10_370_000_000, ["All modes"]),
  segment("iaru-3cm-current-008", "3cm", 10_370_000_000, 10_450_000_000, ["All modes"]),
  segment("iaru-3cm-current-009", "3cm", 10_450_000_000, 10_500_000_000, ["All modes"], undefined, ["Amateur satellite service; 10450-10452 MHz alternative narrow-band segment"]),
];

export const current12mmSegments: IaruSegment[] = [
  segment("iaru-12mm-current-001", "12mm", 24_000_000_000, 24_048_000_000, ["All modes"], undefined, ["24.025 GHz wideband centre"]),
  segment("iaru-12mm-current-002", "12mm", 24_048_000_000, 24_048_800_000, ["All modes"], 2_700, ["Amateur satellite service; narrow-band modes; 24.0482 GHz centre"]),
  segment("iaru-12mm-current-003", "12mm", 24_048_800_000, 24_048_995_000, ["All modes"], undefined, ["Beacons only"]),
  segment("iaru-12mm-current-004", "12mm", 24_049_000_000, 24_050_000_000, ["All modes"], 2_700, ["Amateur satellite service; narrow-band modes"]),
  segment("iaru-12mm-current-005", "12mm", 24_050_000_000, 24_250_000_000, ["All modes"]),
];

export const current6mmSegments: IaruSegment[] = [
  segment("iaru-6mm-current-001", "6mm", 47_000_000_000, 47_088_000_000, ["All modes"]),
  segment("iaru-6mm-current-002", "6mm", 47_088_000_000, 47_090_000_000, ["All modes"], 2_700, ["47.0882 GHz narrow-band centre; amateur satellite service"]),
  segment("iaru-6mm-current-003", "6mm", 47_090_000_000, 47_200_000_000, ["All modes"]),
];

export const current4mmSegments: IaruSegment[] = [
  segment("iaru-4mm-current-001", "4mm", 75_500_000_000, 76_000_000_000, ["All modes"], 2_700, ["Amateur satellite service; preferred in CEPT countries implementing ECA35"]),
  segment("iaru-4mm-current-002", "4mm", 76_000_000_000, 77_500_000_000, ["All modes"], undefined, ["76032.2 MHz narrow-band centre in some countries; not preferred"]),
  segment("iaru-4mm-current-003", "4mm", 77_500_000_000, 77_501_000_000, ["All modes"], 2_700, ["Amateur satellite service; 77500.2 MHz preferred narrow-band centre outside CEPT ECA35 area"]),
  segment("iaru-4mm-current-004", "4mm", 77_501_000_000, 78_000_000_000, ["All modes"], undefined, ["Preferred segment"]),
  segment("iaru-4mm-current-005", "4mm", 78_000_000_000, 81_500_000_000, ["All modes"], undefined, ["Not preferred segment"]),
];

export const current122GSegments: IaruSegment[] = [
  segment("iaru-122G-current-001", "122G", 122_250_000_000, 122_251_000_000, ["All modes"], 2_700, ["Narrow-band modes"]),
  segment("iaru-122G-current-002", "122G", 122_251_000_000, 123_000_000_000, ["All modes"]),
];

export const current134GSegments: IaruSegment[] = [
  segment("iaru-134G-current-001", "134G", 134_000_000_000, 134_928_000_000, ["All modes"], undefined, ["Amateur satellite service"]),
  segment("iaru-134G-current-002", "134G", 134_928_000_000, 134_930_000_000, ["All modes"], 2_700, ["134.930 GHz narrow-band centre"]),
  segment("iaru-134G-current-003", "134G", 134_930_000_000, 136_000_000_000, ["All modes"]),
  segment("iaru-134G-current-004", "134G", 136_000_000_000, 141_000_000_000, ["All modes"], undefined, ["Not preferred segment"]),
];

export const current241GSegments: IaruSegment[] = [
  segment("iaru-241G-current-001", "241G", 241_000_000_000, 248_000_000_000, ["All modes"], undefined, ["Not preferred segment"]),
  segment("iaru-241G-current-002", "241G", 248_000_000_000, 248_001_000_000, ["All modes"], undefined, ["Amateur satellite service; narrow-band modes"]),
  segment("iaru-241G-current-003", "241G", 248_001_000_000, 250_000_000_000, ["All modes"], undefined, ["Preferred segment"]),
];

export const currentVhfUpReplacementSegments: IaruSegment[] = [
  ...current70cmSegments,
  ...current23cmSegments,
  ...current9cmSegments,
  ...current6cmSegments,
  ...current3cmSegments,
  ...current12mmSegments,
  ...current6mmSegments,
  ...current4mmSegments,
  ...current122GSegments,
  ...current134GSegments,
  ...current241GSegments,
];

export const replacedVhfUpBandIds = new Set(
  currentVhfUpReplacementSegments.map((segment) => segment.bandId),
);
