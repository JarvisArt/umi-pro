export type ProjectDataType = {
  id: string;
  name: string;
  shortName?: string;
  master: string;
  alias: string;
};

export type ProjectParams = Pick<ProjectDataType, 'name' | 'shortName' | 'master'>;
