"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthProvider";
import { supabase } from "../../../superbaseClient";
import { StatsGridIcons } from "@/components/StatsCard";
import ReactECharts from "echarts-for-react";
import { Box, Paper, Group, Title } from "@mantine/core";
import classes from "./DashboardPage.module.css";
import useFinancialSummaryStore from "@/store/useFinancialSummary";
import useIncomeEchart from "@/store/useIncomeEchart";
import useCategoryExpenses from "@/store/useCategoryExpenses";
import { getUserData } from "@/utils";
import useUserStore from "@/store/userStore/userStore";

export default function DashboardPage() {
  const { data, isLoading, error, fetchData } = useFinancialSummaryStore();
  const { getUser } = useUserStore();
  const {
    data: lineChartData,
    isLoading: isLoadingLineChart,
    error: errorLineChart,
    fetchData: fetchLineChart,
  } = useIncomeEchart();
  const {
    data: expenseCategoryData,
    isLoading: isLoadingPieChart,
    error: isErrorPieChart,
    fetchData: fetchPieChartData,
  } = useCategoryExpenses();
  const [summary, setSummary] = useState(null);
  // useEffect(() => {
  //   getUser(getUserData().email);
  // }, []);
  useEffect(() => {
    const formatFinancialSummary = (data) => {
      return [
        {
          title: "TOTAL INCOME",
          value: data.totalIncome,
          diff: data.performance?.incomeChange, // Include income change
        },
        {
          title: "TOTAL EXPENSE",
          value: data.totalExpense,
          diff: data.performance?.expenseChange, // Include expense change
        },
        {
          title: "NET WORTH",
          value: data.netWorth,
          diff: null, // No change value for net worth
        },
      ];
    };
    if (data) setSummary(formatFinancialSummary(data));
  }, [data]);

  useEffect(() => {
    fetchData();
    fetchLineChart();
    fetchPieChartData();
  }, [fetchData, fetchLineChart, fetchPieChartData]);
  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div style={{ paddingTop: "20px" }}>
      {isLoading ? <div>Loading...</div> : <StatsGridIcons data={summary} />}

      <Box px="xs" my={"xs"} style={{ marginBottom: "80px" }}>
        <Paper withBorder mb={"md"} radius={0}>
          <Group
            justify={"space-between"}
            align={"center"}
            className={classes.header}
          >
            <Title order={5} style={{ marginLeft: "12px", padding: "10px" }}>
              Income vs Expenses (last 6 months)
            </Title>
          </Group>
          <Box p={"20px"}>
            {isLoadingLineChart ? (
              <></>
            ) : (
              <ReactECharts option={lineChartData} opts={{ renderer: "svg" }} />
            )}
          </Box>
        </Paper>
      </Box>

      <Box
        px="xs"
        my={"xs"}
        style={{ marginBottom: "80px", marginTop: "60px" }}
      >
        <Paper withBorder mb={"md"} radius={0}>
          <Group
            justify={"space-between"}
            align={"center"}
            className={classes.header}
          >
            <Title order={5} style={{ marginLeft: "12px", padding: "10px" }}>
              Expenses by Category
            </Title>
          </Group>
          <Box p={"30px"}>
            {isLoadingPieChart ? (
              <div>Loading...</div>
            ) : (
              <ReactECharts
                option={expenseCategoryData}
                opts={{ renderer: "svg" }}
              />
            )}
          </Box>
        </Paper>
      </Box>
    </div>
  );
}
