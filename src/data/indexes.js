// These two functions group activities by placeID + personSubjID
// Should definitely be consolidated into a singular function at some point
export function buildActivityIndex(activities) {
  const map = {};

  activities.forEach((a) => {
    if (!a.personSubjID) return;

    const id = String(parseInt(a.personSubjID));

    if (!map[id]) {
      map[id] = [];
    }

    map[id].push(a);
  });

  return map;
}

export function buildPlaceIndex(activities) {
  const map = {};

  activities.forEach((a) => {
    if (!a.placeID) return;

    const id = String(parseInt(a.placeID));

    if (!map[id]) {
      map[id] = [];
    }

    map[id].push(a);
  });

  return map;
}