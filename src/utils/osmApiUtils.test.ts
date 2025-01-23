import { BadgeStructure } from '@/models/osm';
import { deserializeBadgeStructure } from './osmApiUtils';

import mockBadgeStructureJson from '../../tests/test-data/osm-api-badge-structure.json';

describe('deserializeBadgeStructure', () => {
  it('should correctly deserialize badge structures with valid input', () => {
    // Expected output
    const expected: BadgeStructure[] = [
      {
        badgeId: "1530",
        badgeVersion: "0",
        details: {
          badge_id: "1530",
          badge_version: "0",
          shortname: "1530",
          badge_identifier: "1530_0",
          name: "Adventure",
          picture: "sites/onlinescoutmanager.co.uk/badge_images/img_231887.png",
          description: "Complete all parts of this badge.  Two of the adventures should be new, and you should try to do them more than once.",
          parents_description: "",
          config: "{\"requires\":[[\"a\"],[\"b\"]]}",
          portal_config: "{\"always_show_in_list\":true,\"position\":\"right-chest-2015\",\"hide\":false}",
          userid: "1",
          sharing: "default-locked",
          latest: "0",
          badge_order: "1",
          group_name: "",
          created_at: "2015-01-26 15:23:52",
          lastupdated: "2019-07-19 10:36:12",
          type_id: "1"
        },
        fields: [
          {
            name: "Adventure",
            field: "114263",
            width: "150px",
            formatter: "cellFormatter",
            tooltip: "Take part in an adventure.",
            module: "a",
            section_id: "0",
            sameas: "0",
            editable: "true",
          },
          {
            name: "Adventure",
            field: "114264",
            width: "150px",
            formatter: "cellFormatter",
            tooltip: "Take part in an adventure.",
            module: "a",
            section_id: "0",
            sameas: "114263",
            editable: "true",
          },
          {
            name: "Adventure",
            field: "114265",
            width: "150px",
            formatter: "cellFormatter",
            tooltip: "Take part in an adventure.",
            module: "a",
            section_id: "0",
            sameas: "114263",
            editable: "true",
          },
          {
            name: "Adventure",
            field: "114266",
            width: "150px",
            formatter: "cellFormatter",
            tooltip: "Take part in an adventure.",
            module: "a",
            section_id: "0",
            sameas: "114263",
            editable: "true",
          },
          {
            name: "Develop",
            field: "114267",
            width: "150px",
            formatter: "cellFormatter",
            tooltip: "Show how you have developed skills, and understand the safety issues and equipment needed for one of the activities.",
            module: "b",
            section_id: "0",
            sameas: "0",
            editable: "true"
          },
          {
            name: "Environment",
            field: "114268",
            width: "150px",
            formatter: "cellFormatter",
            tooltip: "Learn about environmental issues caused by the activity and take steps to reduce the damage.",
            module: "b",
            section_id: "0",
            sameas: "0",
            editable: "true"
          },
          {
            name: "Other ways",
            field: "114269",
            width: "150px",
            formatter: "cellFormatter",
            tooltip: "Find out other ways you can take part and follow up your research with action.",
            module: "b",
            section_id: "0",
            sameas: "0",
            editable: "true"
          }
        ],
      },
    ];

    // Call the function with mock data
    const result = deserializeBadgeStructure(mockBadgeStructureJson);

    // Assert the result matches the expected output
    expect(result).toEqual(expected);
  });

  it('should handle missing details gracefully', () => {
    // Mock JSON input with missing details
    const mockJson = {
      structure: {
        "1530_0": [
          { rows: [] },
          {
            rows: [
              {
                name: "Adventure",
                field: "114263",
                width: "150px",
                formatter: "cellFormatter",
              },
            ],
          },
        ],
      },
      details: {}, // No corresponding details
    };

    // Call the function
    const result = deserializeBadgeStructure(mockJson);

    // Assert the result is an empty array
    expect(result).toEqual([]);
  });

  it('should handle missing rows gracefully', () => {
    // Mock JSON input with no second rows
    const mockJson = {
      structure: {
        "1530_0": [
          { rows: [] }, // First rows (ignored)
          { rows: [] }, // Second rows (empty)
        ],
      },
      details: {
        "1530_0": {
          badge_id: "1530",
          badge_version: "0",
          shortname: "Adventure",
          badge_identifier: "adv123",
          name: "Adventure",
          picture: "path/to/image.png",
          description: "Complete the badge.",
        },
      },
    };

    // Expected output
    const expected: BadgeStructure[] = [
      {
        badgeId: "1530",
        badgeVersion: "0",
        details: {
          badge_id: "1530",
          badge_version: "0",
          shortname: "Adventure",
          badge_identifier: "adv123",
          name: "Adventure",
          picture: "path/to/image.png",
          description: "Complete the badge.",
        },
        fields: [], // No fields since rows are empty
      },
    ];

    // Call the function
    const result = deserializeBadgeStructure(mockJson);

    // Assert the result matches the expected output
    expect(result).toEqual(expected);
  });
});