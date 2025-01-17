import { Term } from "./Term";

export interface Section {
  groupname: string;
  groupid: string;
  sectionname: string;
  sectionid: string;
  section: string;
  latestTerm?: Term;
}