export interface IPermissionValue {
  FE_KEY: string;
  BE_KEY: Array<string>;
  TYPE: 'AND' | 'OR';
}

export const beKeyToFeKey = (listperMission: Array<IPermissionValue>, beKey: string): string[] => {
  if (!listperMission || !beKey) {
    return [];
  }
  const defaultKey: string[] = [];
  return listperMission.reduce((feKey, permissionValue) => {
    const { FE_KEY, BE_KEY, TYPE } = permissionValue;
    if (BE_KEY.length === 0) {
      feKey.push(FE_KEY);
      return feKey;
    }

    switch (TYPE) {
      case 'AND':
        if (BE_KEY.every(key => beKey.includes(key))) {
          feKey.push(FE_KEY);
        }
        break;
      case 'OR':
        if (BE_KEY.some(key => beKey.includes(key))) {
          feKey.push(FE_KEY);
        }
        break;
    }
    return feKey;
  }, defaultKey);
};
