export interface ImpactSummary {
  totalResidents: number;
  activeResidents: number;
  activeSafehouses: number;
  totalDonations: number;
  completedReintegrations: number;
  completedReintegrationsAllTime: number;
  reintegrationRate: number;
  okrGoal: number;
}

export interface MonthlyDataPoint {
  year: number;
  month: number;
}
