// Interface for Badge
export enum BadgeType {
  Challenge = 1,
  Activity = 2,
  Staged = 3,
  Core = 4,
}

export interface Badge {
  completed: string; // Indicates completion status (e.g., "0" for incomplete, "1" for complete)
  awarded: string;   // Indicates if the badge has been awarded ("1" for yes)
  awarded_date: number; // Unix timestamp for the awarded date, or -1 if not awarded
  badge: string;        // Name of the badge
  badge_shortname: string; // Short name identifier for the badge
  badge_group: string;    // Badge group identifier
  status: number;         // Progress or completion percentage (e.g., 0.8 = 80%)
  picture: string;        // Path to the badge image
  badge_identifier: string; // Unique identifier for the badge
  badge_id: string;       // ID for the badge
  level: string | boolean; // Level of the badge, can be "Lvl X" or `false`
}

export interface BadgeField {
  name: string;         // Name of the field
  field: string;        // Unique field identifier
  width: string;        // Width of the field for display
  formatter?: string;   // Optional formatter function
  tooltip?: string;     // Tooltip text for the field
  module?: string;      // Associated module
  section_id?: string;  // Section ID for the badge field
  sameas?: string;      // Reference to another field
  editable?: string;    // Editable status ("true" or "false")
}

export interface BadgeDetails {
  badge_id: string;
  badge_version: string;
  shortname: string;
  badge_identifier: string;
  name: string;
  picture: string;
  description: string;
  parents_description?: string;
  config?: string;
  portal_config?: string;
  userid?: string;
  sharing?: string;
  latest?: string;
  badge_order?: string;
  group_name?: string;
  created_at?: string;
  lastupdated?: string;
  type_id?: string;
}

export interface BadgeStructure {
  badgeId: string;        // Badge ID
  badgeVersion: string;   // Badge version
  details: BadgeDetails;  // Badge details object
  fields: BadgeField[];   // Array of BadgeField representing rows from the second `rows` element
}

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

export interface Section {
  groupname: string;
  groupid: string;
  sectionname: string;
  sectionid: string;
  section: string;
  latestTerm?: Term;
}

export interface Term {
  termid: string;
  sectionid: string;
  name: string;
  startdate: string;
  enddate: string;
}