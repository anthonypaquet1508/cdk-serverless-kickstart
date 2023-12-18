export enum Environments {
    Prod = "prod",
    Dev = "dev",
    Staging = "staging",
}

export enum Regions {
    usEast1 = "us-east-1",
    caCentral1 = "ca-central-1",
}
  
export interface AppConfig {
    env: Environments;
    accountId: string;
    region: Regions;
}