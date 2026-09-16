import type { LegalConditionId } from "./lv/legal-conditions";

export type FrequencyHz = number;

export type LicenceClass = "A" | "B" | "C";

export type AllocationCategory = "PRIMeks" | "PRIM" | "sek";

export type PowerDesignation = "pX" | "pZ";

export interface FrequencyRange {
  fromHz: FrequencyHz;
  toHz: FrequencyHz;
}

export interface DataSource {
  id: string;
  title: string;
  url: string;
  revision?: string;
  verifiedOn: string;
  notes?: string[];
}

export interface PowerLimit {
  designation: PowerDesignation;
  maxWatts: number;

  /**
   * True when the legal source specifies the limit as e.i.r.p.
   * The original legal wording is always retained in sourceText.
   */
  eirp?: boolean;

  sourceText: string;
}

export interface LegalRule extends FrequencyRange {
  id: string;
  licenceClass: LicenceClass;
  allocation: AllocationCategory;
  power: PowerLimit;

  maxBandwidthHz?: number;

  /**
   * Juridiski atļautie darba veidi, ja konkrētajam noteikumam tie ir ierobežoti.
   * Piemēram: CW, SSB, MGM.
   */
  allowedModes?: string[];

  /**
   * Juridiski atļautās izstarojuma klases, ja tās ir noteiktas.
   * Piemēram: F3E, G3E, FXW.
   */
  emissionClasses?: string[];

  conditions?: LegalConditionId[];

  sourceId: string;
  sourceReference: string;
}

export interface BandDefinition extends FrequencyRange {
  id: string;
  name: string;
  route: string;
  displayUnit: "kHz" | "MHz" | "GHz";
}

export interface IaruSegment extends FrequencyRange {
  id: string;
  bandId: string;

  maxBandwidthHz?: number;

  modes: string[];
  usage?: string[];
  notes?: string[];

  sourceId: string;
}

export interface ActivityMarker {
  id: string;
  bandId: string;
  frequencyHz: FrequencyHz;
  name: string;
  category?: string;
  sourceId?: string;
}

export interface BandplanData {
  bands: BandDefinition[];
  legalRules: LegalRule[];
  iaruSegments: IaruSegment[];
  activityMarkers: ActivityMarker[];
}
