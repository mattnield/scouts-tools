import { Badge } from "./Badge";

// Interface for Member
export interface Member {
  firstname: string;         // First name of the member
  lastname: string;          // Last name of the member
  scout_id: number;          // Unique ID for the scout
  photo_guid: string;        // GUID for the scout's photo
  patrolid: number;          // ID of the patrol the scout belongs to
  patrolleader: string;      // Indicates if the scout is a patrol leader (e.g., "2")
  patrol: string;            // Name of the patrol
  dob: string;               // Date of birth (formatted as string)
  sectionid: number;         // ID of the scout's section
  enddate: string | null;    // End date for the section (null if not ended)
  age: string;               // Age of the scout
  patrol_role_level_label: string; // Role label within the patrol
  active: boolean;           // Indicates if the scout is currently active
  scoutid: number;           // Duplicate of scout_id
  badges: Badge[];           // Array of badges assigned to the scout
}