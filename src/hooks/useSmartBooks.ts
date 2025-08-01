// React hooks for SmartBooks financial integration

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  FinancialSummary,
  PayrollSummary,
  ProjectFinancials,
  ExpenseSubmission,
  TimeEntrySubmission,
  PurchaseRequestSubmission,
  SmartBooksApiResponse,
  FinancialIntegrationStatus
} from '@shared/smartBooks';

// Financial Dashboard Hook
export function useFinancialSummary(employeeId: string) {
  return useQuery({
    queryKey: ['/api/smartbooks/financial-summary', employeeId],
    queryFn: async (): Promise<FinancialSummary> => {
      const response = await fetch(`/api/smartbooks/financial-summary?employeeId=${employeeId}`);
      const result: SmartBooksApiResponse<FinancialSummary> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch financial summary');
      }
      
      return result.data;
    },
    enabled: !!employeeId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Payroll Information Hook
export function usePayrollSummary(employeeId: string) {
  return useQuery({
    queryKey: ['/api/smartbooks/payroll-summary', employeeId],
    queryFn: async (): Promise<PayrollSummary> => {
      const response = await fetch(`/api/smartbooks/payroll-summary?employeeId=${employeeId}`);
      const result: SmartBooksApiResponse<PayrollSummary> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch payroll summary');
      }
      
      return result.data;
    },
    enabled: !!employeeId,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}

// Project Financials Hook
export function useProjectFinancials(projectCode: string) {
  return useQuery({
    queryKey: ['/api/smartbooks/project-financials', projectCode],
    queryFn: async (): Promise<ProjectFinancials> => {
      const response = await fetch(`/api/smartbooks/project-financials?projectCode=${projectCode}`);
      const result: SmartBooksApiResponse<ProjectFinancials> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch project financials');
      }
      
      return result.data;
    },
    enabled: !!projectCode,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Integration Status Hook
export function useSmartBooksIntegrationStatus() {
  return useQuery({
    queryKey: ['/api/smartbooks/integration-status'],
    queryFn: async (): Promise<FinancialIntegrationStatus> => {
      const response = await fetch('/api/smartbooks/integration-status');
      const result: SmartBooksApiResponse<FinancialIntegrationStatus> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to fetch integration status');
      }
      
      return result.data;
    },
    staleTime: 60 * 60 * 1000, // 1 hour
  });
}

// Expense Submission Mutation
export function useSubmitExpense() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (expense: ExpenseSubmission) => {
      const response = await apiRequest('/api/smartbooks/submit-expense', {
        method: 'POST',
        body: JSON.stringify(expense),
      });
      
      const result: SmartBooksApiResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit expense');
      }
      
      return result.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate financial summary to refresh data
      queryClient.invalidateQueries({
        queryKey: ['/api/smartbooks/financial-summary', variables.employeeId]
      });
    },
  });
}

// Time Entry Submission Mutation
export function useSubmitTimeEntry() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (timeEntry: TimeEntrySubmission) => {
      const response = await apiRequest('/api/smartbooks/submit-time-entry', {
        method: 'POST',
        body: JSON.stringify(timeEntry),
      });
      
      const result: SmartBooksApiResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit time entry');
      }
      
      return result.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({
        queryKey: ['/api/smartbooks/financial-summary', variables.employeeId]
      });
      queryClient.invalidateQueries({
        queryKey: ['/api/smartbooks/project-financials', variables.projectCode]
      });
    },
  });
}

// Purchase Request Submission Mutation
export function useSubmitPurchaseRequest() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (request: PurchaseRequestSubmission) => {
      const response = await apiRequest('/api/smartbooks/submit-purchase-request', {
        method: 'POST',
        body: JSON.stringify(request),
      });
      
      const result: SmartBooksApiResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to submit purchase request');
      }
      
      return result.data;
    },
    onSuccess: (_, variables) => {
      // Invalidate financial summary
      queryClient.invalidateQueries({
        queryKey: ['/api/smartbooks/financial-summary', variables.employeeId]
      });
    },
  });
}

// Budget Check Hook
export function useBudgetCheck(budgetCode: string, amount: number) {
  return useQuery({
    queryKey: ['/api/smartbooks/budget-check', budgetCode, amount],
    queryFn: async () => {
      const response = await fetch(`/api/smartbooks/budget-check?budgetCode=${budgetCode}&amount=${amount}`);
      const result: SmartBooksApiResponse<{
        available: boolean;
        remainingBudget: number;
        utilizationPercentage: number;
      }> = await response.json();
      
      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to check budget');
      }
      
      return result.data;
    },
    enabled: !!budgetCode && amount > 0,
    staleTime: 30 * 1000, // 30 seconds
  });
}