// Interface for Badge
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